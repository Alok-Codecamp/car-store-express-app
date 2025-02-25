import { Request, Response } from "express";
import orderService from "./order.service";
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

const getOrdersById = asyncWrapper(async (req, res) => {
    const { email } = req.params;

    const result = await orderService.getOrdersByIdFromDb(email);
    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'Orders retrive successfully',
        data: result
    })

})

const updateOrder = asyncWrapper(async (req, res) => {
    const orderId = req.params.orderId;

    const result = await orderService.updateOrderIntoDb({ orderId, status: req.body?.status })

    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result
    })
})
const deleteOrder = asyncWrapper(async (req, res) => {
    const orderId = req.params.orderId;

    const result = await orderService.deleteOrderIntoDb(orderId)

    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'Order deleted successfully',
        data: result
    })
})

const getRevenue = asyncWrapper(async (req, res) => {

    const result = await orderService.getOrderRevenue();


    res.status(200).json({
        message: "Revenue calculated successfully",
        status: true,
        data: {
            totalRevenue: result
        }
    })

})

const verifyPayment = asyncWrapper(async (req, res) => {

    const { order_id } = req.query;

    const paymentVericationResponse = await orderService.verifyPaymentFromShurjoPay(order_id as string);

    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'Orderd veryfied.',
        data: paymentVericationResponse
    })
})

export default {
    createOrder,
    getRevenue,
    getOrders,
    verifyPayment,
    getOrdersById,
    updateOrder,
    deleteOrder,
}