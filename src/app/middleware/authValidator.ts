import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../module/user/user.interface";
import asyncWrapper from "../utils/asyncWraper";
import AppError from "../utils/AppError";
import status from "http-status";
import { verifyToken } from "../module/auth/auth.utils";
import config from "../config/config";
import { UserModel } from "../module/user/user.model";



interface CustomRequest extends Request {
    user: JwtPayload;
}

export const authValidator = (...requiredRoles: TUserRole[]) => {
    return asyncWrapper(async (req, res, next) => {


        const token = req.headers.authorization;

        // Check if the token is missing
        if (!token) {
            throw new AppError(status.UNAUTHORIZED, 'Unauthorized user!')
        }
        const decoded = verifyToken(token, config.jwt_access_secret as string);

        const { email, role, iat } = decoded;

        const existingUser = await UserModel.isUserExistsByEmail(email);


        //check if the user is missing
        if (!existingUser) {
            throw new AppError(status.NOT_ACCEPTABLE, 'User not found!')
        }



        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(status.NOT_ACCEPTABLE, `you are unauthorized. please login!`)
        }

        req.user = decoded as JwtPayload;
        next();
    })
}