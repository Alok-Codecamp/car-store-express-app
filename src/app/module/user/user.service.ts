import AppError from "../../utils/AppError";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import status from "http-status";


const createUserIntoDb = async (payload: IUser) => {

    // console.log('sercvice', payload)
    const userExists = await UserModel.isUserExistsByEmail(payload.email);
    console.log(userExists)
    if (userExists) {
        throw new AppError(status.NOT_ACCEPTABLE, 'You are registerd! Please Login')
    }

    const result = await UserModel.create(payload);

    return result;
}


const getAllUserIntoDb = async () => {
    const result = await UserModel.find();
    return result;
}

export const userService = {
    createUserIntoDb,
    getAllUserIntoDb
}