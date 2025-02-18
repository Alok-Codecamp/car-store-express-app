import { Model, ObjectId } from "mongoose";
import { USER_ROLE } from "./user.constant";

type TRole = "user" | "admin";

export interface IUser {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    role: TRole;
    address?: string;
    status: "Active" | "Blocked"
}

export type TLoginUser = {
    email: string;
    role: string;
    iat: number;
    exp: number;
}


export type TUserRole = keyof typeof USER_ROLE;

export interface IUserModel extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>;
    isPasswordMatched(plainPass: string, hashedPass: string): Promise<boolean>;
}