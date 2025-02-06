import status from "http-status";
import asyncWrapper from "../../utils/asyncWraper";
import responseSender from "../../utils/responseSender";
import { authServices } from "./auth.service";
import config from "../../config/config";







const login = asyncWrapper(async (req, res) => {


    const result = await authServices.login(req.body);

    const { accessToken,
        refreshToken, } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.appMood === 'production',
        httpOnly: true
    })


    responseSender(res, {
        statusCode: status.ACCEPTED,
        success: true,
        message: 'login successfully',
        data: accessToken
    })
})

const refreshToken = asyncWrapper(async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log(refreshToken)
    const result = await authServices.refreshToken(refreshToken as string)

    responseSender(res, {
        statusCode: status.ACCEPTED,
        success: true,
        message: 'refresh token generated',
        data: result
    })
})

export const authController = {
    login,
    refreshToken
}