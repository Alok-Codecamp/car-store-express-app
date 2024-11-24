import { model, Schema } from "mongoose";
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
        required: true
    }
}, { timestamps: true, versionKey: false, id: false })

carOrderSchema.pre('save', async function (next) {


    const car = await CarModel.findById(this.car)
    if (!car) {
        throw new Error('car not found. please give a valied car id')
    }
    this.totalPrice = car.price * this.quantity;
    const newCarQuantity = car.quantity - this.quantity;
    await CarModel.findByIdAndUpdate(this.car, { quantity: newCarQuantity })
    next();
})

const OrderModel = model('order', carOrderSchema)

export default OrderModel;