import status from "http-status";
import AppError from "../../utils/AppError";
import OrderModel from "./order.model"
import CarModel from "../cars/car.model";
import { UserModel } from "../user/user.model";
import { orderUtils } from "./order.utils";
import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";


const createOrderInDb = async (requestedUser: JwtPayload, payload: { cars: { car: string, quantity: number }[] }, client_ip: string, res: Response) => {

    if (!payload?.cars?.length) {
        throw new AppError(status.NOT_ACCEPTABLE, 'Please select a Car!')
    }

    const { cars } = payload;
    const user = await UserModel.isUserExistsByEmail(requestedUser.email);
    let totalPrice = 0;

    const carDetails = await Promise.all(cars.map(async (item) => {
        const car = await CarModel.findById(item.car);
        if (car) {
            const itemPrice = car.price * item.quantity;
            totalPrice += itemPrice;
            return item;
        }
    }))

    const orderData = {
        user: user._id,
        cars: carDetails,
        totalPrice,

    }
    let order = await OrderModel.create(orderData);

    // payment intigration 

    const shurjopayPayload = {
        amount: totalPrice, // Example amount
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: "Rajshahi",
        customer_email: user.email,
        customer_phone: "N/A",
        customer_city: "N/A",
        client_ip,


    }

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        await OrderModel.findByIdAndUpdate(order._id, { transaction: { id: payment.sp_order_id, transactionStatus: payment.transactionStatus } })
    }
    return { order, payment };
}

const verifyPaymentFromShurjoPay = async (order_id: string) => {

    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await OrderModel.findOneAndUpdate({ "transaction.id": order_id }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success" ? "Paid" : verifiedPayment[0].bank_status == "Faild" ? "Pending" : verifiedPayment[0].bank_status == "Cancel" ? "Cancelled" : "Pending"
        })
    }
    return verifiedPayment;
}



const getOrdersFromDb = async () => {
    const orders = await OrderModel.find();
    return orders;
}

const getOrderRevenue = async () => {

    const result = await OrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" }
            }
        }
    ])
    const calculatedRevenue = result[0].totalRevenue;
    // console.log(calculatedRevenue);

    return calculatedRevenue;

}

export default {
    createOrderInDb,
    getOrderRevenue,
    getOrdersFromDb,
    verifyPaymentFromShurjoPay,

}