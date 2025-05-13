
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
        required: [true, 'price is required'],

    },
    category: {
        type: String,
        enum: {
            values: [
                "Sedan",
                "Hatchback",
                "SUV",
                "Crossover",
                "Coupe",
                "Convertible",
                "Sport"
            ],
            message: '{VALUES}   is not valied. Car categories should be one of this Sedan ,SUV , Truck,Coupe,Convertible'
        }
    },
    description: {
        type: String,
        min: [10, 'minimum description should be 30 charecter'],
        maxlength: [200, 'Description cannot be more than 100 charecters']
    },

    quantity: {
        type: Number,
        ref: 'order'
    },

    inStock: {
        type: Boolean,
        default: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    ratings: {
        average: Number,          // e.g., 4.5
        count: Number,            // e.g., total number of reviews
        breakdown: {              // optional: for visual charts
            5: Number,
            4: Number,
            3: Number,
            2: Number,
            1: Number
        },
        lastRatedAt: Date,        // optional: track when last rating was submitted
        ratedUsers: [             // optional: store individual rating info
            {
                userId: Schema.Types.ObjectId,
                rating: Number,
                comment: String,
                date: Date
            }
        ]
    }

}, { versionKey: false, id: false, timestamps: true })


carSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        const { _id, ...rest } = ret;
        return { _id, ...rest };
    }
})



const CarModel = model('cars', carSchema);
export default CarModel;


