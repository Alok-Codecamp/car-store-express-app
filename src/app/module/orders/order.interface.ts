import { ObjectId } from "mongoose";



export interface IOrder {
    email: string;
    car: String;
    quantity: number;
    totalPrice: number;
}