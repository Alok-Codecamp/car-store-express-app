import { Request, Response } from "express";
import { IOrder } from "./order.interface";
import orderService from "./order.service";
import CarModel from "../cars/car.model";
import asyncWrapper from "../../utils/asyncWraper";
import responseSender from "../../utils/responseSender";
import status from "http-status";


const createOrder = async (req: Request, res: Response) => {

    try {
        const orderData: IOrder = req.body;
        // if (orderData.quantity < 1) {
        //     throw new Error('minimum order quantity should be 1')
        // }
        if (orderData) {
            const orderdCar = await CarModel.findById(orderData.car);
            if (orderdCar?.inStock === false) {
                throw new Error('Sorry! This car is out of stocke')
            }

            const result = await orderService.createOrderInDb(orderData)
            console.log(result);

            res.status(200).json({
                message: 'order created successfully',
                status: true,
                data: result
            })
        }
    } catch (error: any) {
        res.status(500).json({
            "message": error.message,
            "success": false,
            "error": error
        })
    }


}
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