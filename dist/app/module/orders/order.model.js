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
const mongoose_1 = require("mongoose");
const car_model_1 = __importDefault(require("../cars/car.model"));
// define Schema for order
const carOrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    car: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'car',
        required: true
    },
    quantity: {
        type: Number,
        min: [1, 'minimun quantity should be 1'],
        required: true,
    },
    totalPrice: {
        type: Number,
    }
}, { timestamps: true, versionKey: false, id: false });
// use pre method 
carOrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const car = yield car_model_1.default.findById(this.car);
            if (!car) {
                return next(new mongoose_1.Error('car not found. please give a valied car id'));
            }
            if (car.quantity <= 0) {
                return next(new mongoose_1.Error('This car is not available in our store'));
            }
            this.totalPrice = car.price * this.quantity;
            const newCarQuantity = car.quantity - this.quantity;
            yield car_model_1.default.findByIdAndUpdate(this.car, { quantity: newCarQuantity });
            next();
            if (newCarQuantity <= 0) {
                yield car_model_1.default.findByIdAndUpdate(this.car, { inStock: false });
            }
        }
        catch (err) {
            next(err);
        }
    });
});
const OrderModel = (0, mongoose_1.model)('order', carOrderSchema);
exports.default = OrderModel;
