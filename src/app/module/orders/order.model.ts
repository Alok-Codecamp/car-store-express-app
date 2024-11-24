import { Error, model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import CarModel from "../cars/car.model";



const carOrderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: true,
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'car',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
    }
}, { timestamps: true, versionKey: false, id: false })

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