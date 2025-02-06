import asyncWrapper from "../../utils/asyncWraper";
import responseSender from "../../utils/responseSender";
import httpStatus from 'http-status';
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

    const allUser = await userService.getAllUserIntoDb();
    responseSender(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'users retrive successfully.',
        data: allUser,
    })

})



export const userController = {
    createUser,
    getAllUser
}