import AppError from "../../utils/AppError";
import { UserModel } from "../user/user.model";
import { ILoginData } from "./auth.interface";
import status from "http-status";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config/config";



const login = async (payload: ILoginData) => {
    console.log(payload)
    const isUserExist = await UserModel.isUserExistsByEmail(payload.email);



    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, 'Invalied email !')
    }


    const isPasswordMatched = await UserModel.isPasswordMatched(payload.password, isUserExist.password);

    // check password match or not 
    if (!isPasswordMatched) {
        throw new AppError(status.BAD_REQUEST, 'Invalied password ')
    }

    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);


    return {
        accessToken,
        refreshToken,
    }
}


const refreshToken = async (token: string) => {
    // check token 
    if (!token) {
        throw new AppError(status.NOT_ACCEPTABLE, 'Unauthorized user!')
    }

    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const userExist = await UserModel.findOne({ email: decoded?.email });

    if (!userExist) {
        throw new AppError(status.NOT_FOUND, 'User not found')
    }

    const jwtPayload = {
        email: decoded?.email,
        role: decoded?.role,
    }

    const newToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)

    return {
        newToken
    };
}

export const authServices = {
    login,
    refreshToken
}