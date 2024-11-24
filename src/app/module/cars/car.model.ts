import OrderModel from "../orders/order.model";
import { ICars } from "./cars.interface";
import { model, Schema } from "mongoose";

//defining Car schema 



const carSchema = new Schema<ICars>({
    brand: {
        type: String,
        required: true

    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be a positive number']
    },
    category: {
        type: String,
        enum: {
            values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
            message: '{VALUES}   is not valied. Car categories should be one of this Sedan ,SUV , Truck,Coupe,Convertible'
        }
    },
    description: {
        type: String,
        min: [30, 'minimum description should be 30 charecter'],
        maxlength: [100, 'Description cannot be more than 100 charecters']
    },

    quantity: {
        type: Number,
        ref: 'order'
    },

    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }

}, { versionKey: false, id: false, timestamps: true })


carSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        const { _id, ...rest } = ret;
        return { _id, ...rest };
    }
})


// carOrderSchema.pre('save', async function (next) {

//     const order = OrderModel.findById()

// })





const CarModel = model('cars', carSchema);
export default CarModel;


