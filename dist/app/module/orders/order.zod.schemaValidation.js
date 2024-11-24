"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const orderZodSchema = zod_1.default.object({
    email: zod_1.default.string(),
    car: zod_1.default.string(),
    quantity: zod_1.default.number().min(1, 'Minimum order quantity should be 1'),
    totalPrice: zod_1.default.number()
});
exports.default = orderZodSchema;
