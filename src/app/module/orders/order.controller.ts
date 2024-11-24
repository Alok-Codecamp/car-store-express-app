import { Request, Response } from "express";
import { IOrder } from "./order.interface";
import orderService from "./order.service";
import CarModel from "../cars/car.model";

const createOrder = async (req: Request, res: Response) => {

    try {
        const orderData: IOrder = req.body;
        if (orderData) {
            const orderdCar = await CarModel.findById(orderData.car);
            if (orderdCar?.inStock === false) {
                throw new Error('Sorry! This car is out of stocke')
            }

            const result = await orderService.createOrderInDb(orderData)
            res.status(200).json({
                message: 'order created successfully',
                status: true,
                data: result
            })
        }
    } catch (error) {
        res.json({
            message: 'order cannot be create',
            status: false,
            error: error instanceof Error ? error.message : 'unknown error'
        })
    }


}

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
    getRevenue
}