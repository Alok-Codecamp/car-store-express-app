"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// define Schema for order
const carOrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    cars: [
        {
            car: {
                type: mongoose_1.Schema.ObjectId,
                ref: 'cars',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'minimun quantity should be 1'],
            },
            city: {
                type: String
            }
        }
    ],
    totalPrice: {
        type: Number,
    },
    transaction: {
        id: { type: String },
        transactionStatus: { type: String },
        bank_status: { type: String },
        sp_code: { type: String },
        sp_message: { type: String },
        method: { type: String },
        date_time: { type: String },
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Completed", "Cancelled"],
        default: "Pending"
    },
    orderDate: {
        type: Date,
        default: () => new Date()
    },
    deliveryDate: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 5);
            return date;
        }
    }
}, { timestamps: true, versionKey: false });
// use pre method 
// carOrderSchema.pre('save', async function (next) {
//     try {
//         const car = await CarModel.find({ $or: this.cars.map(item => { _id: item.car }) })
//         if (!car) {
//             return next(new Error('car not found. please  select a car for place order'))
//         }
//         if (car.quantity <= 0) {
//             return next(new Error('This car out of stock. please wait for stock again!'));
//         }
//         this.totalPrice = car.price * this.quantity;
//         const newCarQuantity = car.quantity - this.quantity;
//         if (newCarQuantity <= 0) {
//             await CarModel.findByIdAndUpdate(this.car, { inStock: false })
//         }
//         await CarModel.findByIdAndUpdate(this.car, { quantity: newCarQuantity })
//         next();
//     } catch (err: any) {
//         next(err)
//     }
// })
const OrderModel = (0, mongoose_1.model)('order', carOrderSchema);
exports.default = OrderModel;
