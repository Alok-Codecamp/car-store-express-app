import { TUpdateUser } from "../../types/updateUserType";
import AppError from "../../utils/AppError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import status from "http-status";
import bcrypt from 'bcrypt'
import config from "../../config/config";
import { verifyToken } from "../auth/auth.utils";

const createUserIntoDb = async (payload: IUser) => {

    console.log('sercvice', payload)
    const userExists = await UserModel.isUserExistsByEmail(payload.email);
    console.log(userExists)
    if (userExists) {
        throw new AppError(status.NOT_ACCEPTABLE, 'You are registerd! Please Login')
    }

    const result = await UserModel.create(payload);

    return result;
}


const getAllUserFromDb = async () => {
    const result = await UserModel.find();
    return result;
}

const getUserByIdFromDb = async (userEmail: string) => {
    const result = await UserModel.findOne({ email: userEmail })

    if (!result) {
        throw new AppError(status.NOT_FOUND, 'User not found!!')
    }

    return result;
}
const updateUserFromDb = async (userEmail: string, userData: TUpdateUser) => {
    console.log(userData)
    const isuserExist = await UserModel.isUserExistsByEmail(userEmail);
    if (!isuserExist) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }
    const result = await UserModel.findOneAndUpdate({ email: userEmail }, userData, { new: true, upsert: true });

    return result;

}

// const changeStatusByAdmin = (data:{status:string,email:string})=>{

// }

const changePasswordFromDb = async (userEmail: string, data: { oldPassword: string; newPassword: string }) => {
    const isuserExist = await UserModel.isUserExistsByEmail(userEmail);

    if (!isuserExist) {
        throw new AppError(status.NOT_FOUND, 'User not found');
    }

    const isPasswordMatched = await UserModel.isPasswordMatched(data.oldPassword, isuserExist.password);

    if (!isPasswordMatched) {
        throw new AppError(status.NOT_ACCEPTABLE, 'Current password is Wrong!')
    }
    const plainPass = data.newPassword;
    data.newPassword = await bcrypt.hash(plainPass, Number(config.bcrypt_salt_rounds));
    const result = await UserModel.findOneAndUpdate({ email: userEmail }, { password: data.newPassword })

    return result;
}



export const userService = {
    createUserIntoDb,
    getAllUserFromDb,
    getUserByIdFromDb,
    updateUserFromDb,
    changePasswordFromDb,
}