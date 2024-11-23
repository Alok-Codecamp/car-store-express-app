"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//defining Car schema 
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
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
    }
});
const CarModel = (0, mongoose_1.model)('cars', carSchema);
exports.default = CarModel;
