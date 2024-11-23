import { ICars } from "./cars.interface";


//defining Car schema 

import mongoose, { model, Model, Schema } from "mongoose";

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
        type: Number
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

}, { versionKey: false })


carSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.id
        const { _id, ...rest } = ret;
        return { _id, ...rest };
    }
})


const CarModel = model('cars', carSchema);
export default CarModel;


