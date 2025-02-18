import { ObjectId } from "mongoose";



export interface IOrder {
    user: ObjectId;
    cars: {
        car: ObjectId;
        quantity: number;
    }[];
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    totalPrice: number;
    orderDate: Date;
    deliveryDate: Date;
}