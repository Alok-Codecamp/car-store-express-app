import { IOrder } from "./order.interface"
import OrderModel from "./order.model"


const createOrderInDb = async (orderData: IOrder) => {

    try {
        const result = await OrderModel.create(orderData);
        if (!result) {
            throw new Error('somthing went wrong')
        }
        return result;
    } catch (err) {
        return err
    }
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