"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("./order.service"));
const car_model_1 = __importDefault(require("../cars/car.model"));
const asyncWraper_1 = __importDefault(require("../../utils/asyncWraper"));
const responseSender_1 = __importDefault(require("../../utils/responseSender"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // if (orderData.quantity < 1) {
        //     throw new Error('minimum order quantity should be 1')
        // }
        if (orderData) {
            const orderdCar = yield car_model_1.default.findById(orderData.car);
            if ((orderdCar === null || orderdCar === void 0 ? void 0 : orderdCar.inStock) === false) {
                throw new Error('Sorry! This car is out of stocke');
            }
            const result = yield order_service_1.default.createOrderInDb(orderData);
            console.log(result);
            res.status(200).json({
                message: 'order created successfully',
                status: true,
                data: result
            });
        }
    }
    catch (error) {
        res.status(500).json({
            "message": error.message,
            "success": false,
            "error": error
        });
    }
});
const getOrders = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allOrders = yield order_service_1.default.getOrdersFromDb();
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrive successfully',
        data: allOrders
    });
}));
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.default.getOrderRevenue();
        console.log(result);
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: {
                totalRevenue: result
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Revenue calculated failed",
            status: true,
            data: err
        });
    }
});
exports.default = {
    createOrder,
    getRevenue,
    getOrders
};
