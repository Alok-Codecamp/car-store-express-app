import { ObjectId } from "mongoose";



export interface IOrder {
    user: ObjectId;
    cars: {
        car: ObjectId;
        quantity: number;
    }[];
    city: string,
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    totalPrice: number;
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    }
    orderDate: Date;
    deliveryDate: Date;
}