"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("./order.controller"));
const router = express_1.default.Router();
// create order route 
router.post('/', order_controller_1.default.createOrder);
router.get('/revenue', order_controller_1.default.getRevenue);
exports.orderRoutes = router;
