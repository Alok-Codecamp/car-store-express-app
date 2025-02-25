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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const order_model_1 = __importDefault(require("./order.model"));
const car_model_1 = __importDefault(require("../cars/car.model"));
const user_model_1 = require("../user/user.model");
const order_utils_1 = require("./order.utils");
const createOrderInDb = (requestedUser, payload, client_ip, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.cars) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Please select a Car!');
    }
    const { cars } = payload;
    const user = yield user_model_1.UserModel.isUserExistsByEmail(requestedUser.email);
    let totalPrice = 0;
    const carDetails = yield Promise.all(cars.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield car_model_1.default.findById(item.car);
        if (car) {
            const itemPrice = car.price * item.quantity;
            totalPrice += itemPrice;
            return item;
        }
    })));
    const orderData = {
        user: user._id,
        cars: carDetails,
        totalPrice,
    };
    let order = yield order_model_1.default.create(orderData);
    // payment intigration 
    const shurjopayPayload = {
        amount: totalPrice, // Example amount
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name,
        customer_address: cars[0].shippingAddress,
        customer_email: user.email,
        customer_phone: "N/A",
        customer_city: "N/A",
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        yield order_model_1.default.findByIdAndUpdate(order._id, { transaction: { id: payment.sp_order_id, transactionStatus: payment.transactionStatus } });
    }
    return { order, payment };
});
const verifyPaymentFromShurjoPay = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({ "transaction.id": order_id }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success" ? "Paid" : verifiedPayment[0].bank_status == "Faild" ? "Pending" : verifiedPayment[0].bank_status == "Cancel" ? "Cancelled" : "Pending"
        });
    }
    return verifiedPayment;
});
const getOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find();
    return orders;
});
const getOrdersByIdFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.UserModel.isUserExistsByEmail(email);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const result = yield order_model_1.default.find({ user: isUserExist._id });
    return result;
});
// update order 
const updateOrderIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExists = yield order_model_1.default.findById(data.orderId);
    if (!isOrderExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    const result = yield order_model_1.default.findByIdAndUpdate(data.orderId, { status: data.status }, { new: true });
    return result;
});
// delete order 
const deleteOrderIntoDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const isOrderExists = yield order_model_1.default.findById(orderId);
    if (!isOrderExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    const result = yield order_model_1.default.findByIdAndDelete(orderId);
    return result;
});
const getOrderRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" }
            }
        }
    ]);
    const calculatedRevenue = result[0].totalRevenue;
    return calculatedRevenue;
});
exports.default = {
    createOrderInDb,
    getOrderRevenue,
    getOrdersFromDb,
    getOrdersByIdFromDb,
    updateOrderIntoDb,
    deleteOrderIntoDb,
    verifyPaymentFromShurjoPay,
};
