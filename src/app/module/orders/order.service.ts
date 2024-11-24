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


export default {
    createOrderInDb
}