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
const asyncWraper_1 = __importDefault(require("../../utils/asyncWraper"));
const responseSender_1 = __importDefault(require("../../utils/responseSender"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const orderData = req.body;
    const order = yield order_service_1.default.createOrderInDb(user, orderData, req.ip, res);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders created successfully',
        data: order
    });
}));
const getOrders = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allOrders = yield order_service_1.default.getOrdersFromDb();
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrive successfully',
        data: allOrders
    });
}));
const getOrdersById = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield order_service_1.default.getOrdersByIdFromDb(email);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrive successfully',
        data: result
    });
}));
const updateOrder = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orderId = req.params.orderId;
    const result = yield order_service_1.default.updateOrderIntoDb({ orderId, status: (_a = req.body) === null || _a === void 0 ? void 0 : _a.status });
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result
    });
}));
const deleteOrder = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const result = yield order_service_1.default.deleteOrderIntoDb(orderId);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order deleted successfully',
        data: result
    });
}));
const getRevenue = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.getOrderRevenue();
    res.status(200).json({
        message: "Revenue calculated successfully",
        status: true,
        data: {
            totalRevenue: result
        }
    });
}));
const verifyPayment = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order_id } = req.query;
    const paymentVericationResponse = yield order_service_1.default.verifyPaymentFromShurjoPay(order_id);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orderd veryfied.',
        data: paymentVericationResponse
    });
}));
exports.default = {
    createOrder,
    getRevenue,
    getOrders,
    verifyPayment,
    getOrdersById,
    updateOrder,
    deleteOrder,
};
