import asyncWrapper from "../../utils/asyncWraper";
import responseSender from "../../utils/responseSender";
import httpStatus, { status } from 'http-status';
import { userService } from "./user.service";

const createUser = asyncWrapper(async (req, res) => {
    const userData = req.body;
    const result = await userService.createUserIntoDb(userData);

    responseSender(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'congratulations! registration successfully.',
        data: result,
    })
})

const getAllUser = asyncWrapper(async (req, res) => {

    const allUser = await userService.getAllUserFromDb();
    responseSender(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'users retrive successfully.',
        data: allUser,
    })

})

const getUserByEmail = asyncWrapper(async (req, res) => {
    console.log(req.params.userEmail)
    const result = await userService.getUserByIdFromDb(req.params.userEmail)

    responseSender(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'users retrive successfully.',
        data: result,
    })
})
const updateUser = asyncWrapper(async (req, res) => {

    const result = await userService.updateUserFromDb(req.params.userEmail, req.body)

    responseSender(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'users updated successfully.',
        data: result,
    })
})

const changePassword = asyncWrapper(async (req, res) => {

    const result = await userService.changePasswordFromDb(req.params.userEmail, req.body)
    responseSender(res, {
        statusCode: status.OK,
        success: true,
        message: 'password changed.',
        data: result,
    })
})



export const userController = {
    createUser,
    getAllUser,
    getUserByEmail,
    updateUser,
    changePassword,
}