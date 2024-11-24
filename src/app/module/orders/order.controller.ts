import { Request, Response } from "express";
import { IOrder } from "./order.interface";
import orderService from "./order.service";

const createOrder = async (req: Request, res: Response) => {

    try {
        const orderData: IOrder = req.body;
        if (orderData) {
            const result = await orderService.createOrderInDb(orderData)
            res.status(200).json({
                message: 'order created successfully',
                status: true,
                data: result
            })
        }
    } catch (err) {
        res.json({
            error: err
        })
    }


}

export default {
    createOrder
}