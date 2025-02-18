import status from "http-status";
import AppError from "../../utils/AppError";
import OrderModel from "./order.model"
import CarModel from "../cars/car.model";
import { UserModel } from "../user/user.model";
import { orderUtils } from "./order.utils";
import { JwtPayload } from "jsonwebtoken";
import { Response } from "express";


const createOrderInDb = async (requestedUser: JwtPayload, payload: { cars: { car: string, quantity: number }[] }, client_ip: string, res: Response) => {

    if (!payload.cars.length) {
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
    const order = await OrderModel.create(orderData);

    // payment intigration 

    const shurjopayPayload = {
        amount: 1500, // Example amount
        order_id: "ORDER12345", // Must be generated dynamically
        currency: "BDT",
        customer_name: "John Doe",
        customer_address: "123 Main Street, Dhaka",
        customer_email: "johndoe@example.com",
        customer_phone: "017XXXXXXXX",
        customer_city: "Dhaka"

    }

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);



    return { order, payment };


}

const getOrdersFromDb = async () => {

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

}