"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config/config"));
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('sercvice', payload);
    const userExists = yield user_model_1.UserModel.isUserExistsByEmail(payload.email);
    console.log(userExists);
    if (userExists) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'You are registerd! Please Login');
    }
    const result = yield user_model_1.UserModel.create(payload);
    return result;
});
const getAllUserFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
const getUserByIdFromDb = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ email: userEmail });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!!');
    }
    return result;
});
const updateUserFromDb = (userEmail, userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userData);
    const isuserExist = yield user_model_1.UserModel.isUserExistsByEmail(userEmail);
    if (!isuserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.UserModel.findOneAndUpdate({ email: userEmail }, userData, { new: true, upsert: true });
    return result;
});
// const changeStatusByAdmin = (data:{status:string,email:string})=>{
// }
const changePasswordFromDb = (userEmail, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isuserExist = yield user_model_1.UserModel.isUserExistsByEmail(userEmail);
    if (!isuserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordMatched = user_model_1.UserModel.isPasswordMatched(data.oldPassword, isuserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Please enter correct password!');
    }
    const plainPass = data.newPassword;
    data.newPassword = yield bcrypt_1.default.hash(plainPass, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.UserModel.findOneAndUpdate({ email: userEmail }, { password: data.newPassword });
    return result;
});
exports.userService = {
    createUserIntoDb,
    getAllUserFromDb,
    getUserByIdFromDb,
    updateUserFromDb,
    changePasswordFromDb,
};
