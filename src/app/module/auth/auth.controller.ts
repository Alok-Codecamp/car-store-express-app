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
    console.log('refresh token', refreshToken)
    const result = await authServices.refreshToken(refreshToken as string)
    console.log('result', result);
    responseSender(res, {
        statusCode: status.ACCEPTED,
        success: true,
        message: 'refresh token generated',
        data: result
    })
})
const forgetPassword = asyncWrapper(async (req, res) => {
    const userEmail = req.body?.email;
    console.log(userEmail)
    const result = await authServices.forgetPassword(userEmail);
    console.log(result)
    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'check email for reset password',
        data: result
    })

})

const resetPassword = asyncWrapper(async (req, res) => {
    // console.log(req.body);
    const result = await authServices.resetPassword(req.body);

    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'password reset successfully',
        data: result
    })

})


export const authController = {
    login,
    refreshToken,
    forgetPassword,
    resetPassword
}