import AppError from "../../utils/AppError";
import { UserModel } from "../user/user.model";
import { ILoginData } from "./auth.interface";
import status from "http-status";
import { createToken, sendEmail, verifyToken } from "./auth.utils";
import config from "../../config/config";
import bcrypt from 'bcrypt'


const login = async (payload: ILoginData) => {
    const isUserExist = await UserModel.isUserExistsByEmail(payload.email);

    // check if user is missing 
    if (!isUserExist) {
        throw new AppError(status.NOT_FOUND, 'Invalied email !')
    }


    const isPasswordMatched = await UserModel.isPasswordMatched(payload.password, isUserExist.password);

    // check password is not match 
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

const forgetPassword = async (userEmail: string) => {
    console.log(userEmail)
    const isUserExists = await UserModel.isUserExistsByEmail(userEmail);
    console.log(isUserExists)
    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, `This user is not found !`)
    }


    const userStatus = isUserExists?.status;

    if (userStatus === 'Blocked') {
        throw new AppError(status.FORBIDDEN, `This user is blocked !`)
    }
    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role

    }

    const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m')

    const resetUrl = `http://localhost:5173/reset-password?email=${isUserExists.email}&token=${resetToken}`

    sendEmail(isUserExists.email, resetUrl);

    return 'reset password send to your email'

}

const resetPassword = async (payload: { email: string, newPassword: string }, token: string) => {
    const isUserExists = await UserModel.isUserExistsByEmail(payload.email);
    console.log('is user ', isUserExists);


    if (!isUserExists) {
        throw new AppError(status.NOT_FOUND, `This user is not found !`)
    }

    const userStatus = isUserExists?.status;

    if (userStatus === "Blocked") {
        throw new AppError(status.FORBIDDEN, `This user is blocked !`)
    }

    const decoded = verifyToken(token, config.jwt_access_secret as string)

    const { role, email, iat } = decoded;

    if (email !== payload.email) {
        throw new AppError(status.FORBIDDEN, 'You are fobidden!')
    }

    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds))

    const result = await UserModel.findOneAndUpdate({
        email,
        role,
    }, {
        password: newHashedPassword,
    })

    return 'password reset successfully. please Login'

}
export const authServices = {
    login,
    refreshToken,
    forgetPassword,
    resetPassword
}