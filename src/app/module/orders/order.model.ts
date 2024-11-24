import { Error, model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import CarModel from "../cars/car.model";
import { string } from "zod";


// define Schema for order

const carOrderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: true,
    },
    car: {
        type: string,
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
}, { timestamps: true, versionKey: false, id: false })


// use pre method 
carOrderSchema.pre('save', async function (next) {

    try {

        const car = await CarModel.findById(this.car)
        if (!car) {
            return next(new Error('car not found. please give a valied car id'))
        }
        if (car.quantity <= 0) {
            return next(new Error('This car is not available in our store'));
        }
        this.totalPrice = car.price * this.quantity;
        const newCarQuantity = car.quantity - this.quantity;
        await CarModel.findByIdAndUpdate(this.car, { quantity: newCarQuantity })
        next();
        if (newCarQuantity <= 0) {
            await CarModel.findByIdAndUpdate(this.car, { inStock: false })
        }


    } catch (err) {
        next(err as Error)
    }
})

const OrderModel = model('order', carOrderSchema)

export default OrderModel;