import { Error, model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import CarModel from "../cars/car.model";



// define Schema for order

const carOrderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: true,
    },
    car: {
        type: Schema.ObjectId,
        ref: 'car',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'minimun quantity should be 1'],
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

        if (newCarQuantity <= 0) {
            await CarModel.findByIdAndUpdate(this.car, { inStock: false })
        }
        await CarModel.findByIdAndUpdate(this.car, { quantity: newCarQuantity })

        next();

    } catch (err: any) {
        next(err)
    }
})

const OrderModel = model<IOrder>('order', carOrderSchema)

export default OrderModel;