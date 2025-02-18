import { Request, Response } from "express";
import { IOrder } from "./order.interface";
import orderService from "./order.service";
import CarModel from "../cars/car.model";
import asyncWrapper from "../../utils/asyncWraper";
import responseSender from "../../utils/responseSender";
import status from "http-status";


const createOrder = asyncWrapper(async (req: Request, res: Response) => {

    const user = req.user;
    const orderData = req.body;

    const order = await orderService.createOrderInDb(user, orderData, req.ip!, res);


    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'Orders created successfully',
        data: order
    })

})
const getOrders = asyncWrapper(async (req, res) => {
    const allOrders = await orderService.getOrdersFromDb();

    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'Orders retrive successfully',
        data: allOrders
    })
})
const getRevenue = async (req: Request, res: Response) => {

    try {
        const result = await orderService.getOrderRevenue();
        console.log(result);

        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: {
                totalRevenue: result
            }
        })
    } catch (err) {
        res.status(500).json({
            message: "Revenue calculated failed",
            status: true,
            data: err
        })
    }
}

export default {
    createOrder,
    getRevenue,
    getOrders
}