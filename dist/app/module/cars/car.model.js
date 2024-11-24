"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//defining Car schema 
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
}, { versionKey: false, id: false, timestamps: true });
carSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        const { _id } = ret, rest = __rest(ret, ["_id"]);
        return Object.assign({ _id }, rest);
    }
});
// carOrderSchema.pre('save', async function (next) {
//     const order = OrderModel.findById()
// })
const CarModel = (0, mongoose_1.model)('cars', carSchema);
exports.default = CarModel;
