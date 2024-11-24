import { IOrder } from "./order.interface"
import OrderModel from "./order.model"


const createOrderInDb = async (orderData: IOrder) => {


    const result = await OrderModel.create(orderData);
    return result;

}

const getOrderRevenue = async () => {

    const result: any = await OrderModel.aggregate([
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
    getOrderRevenue
}