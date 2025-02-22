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
exports.authServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.UserModel.isUserExistsByEmail(payload.email);
    // check if user is missing 
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalied email !');
    }
    const isPasswordMatched = yield user_model_1.UserModel.isPasswordMatched(payload.password, isUserExist.password);
    // check password is not match 
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalied password ');
    }
    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // check token 
    if (!token) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Unauthorized user!');
    }
    const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const userExist = yield user_model_1.UserModel.findOne({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email });
    if (!userExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const jwtPayload = {
        email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
        role: decoded === null || decoded === void 0 ? void 0 : decoded.role,
    };
    const newToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        newToken
    };
});
const forgetPassword = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.isUserExistsByEmail(userEmail);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `This user is not found !`);
    }
    const userStatus = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.status;
    if (userStatus === 'Blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This user is blocked !`);
    }
    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role
    };
    const resetToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resetUrl = `http://localhost:5173/reset-password?email=${isUserExists.email}&token=${resetToken}`;
    (0, auth_utils_1.sendEmail)(isUserExists.email, resetUrl);
    return 'reset password send to your email';
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, auth_utils_1.verifyToken)(payload.token, config_1.default.jwt_access_secret);
    if (decoded.email !== payload.email) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `You are not registerd ! please login`);
    }
    const isUserExists = yield user_model_1.UserModel.isUserExistsByEmail(payload.email);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `This user is not found !`);
    }
    const userStatus = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.status;
    if (userStatus === "Blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, `This user is blocked !`);
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield user_model_1.UserModel.findOneAndUpdate({
        email: payload.email,
        role: isUserExists.role
    }, {
        password: newHashedPassword,
    }, { new: true });
    return result;
});
exports.authServices = {
    login,
    refreshToken,
    forgetPassword,
    resetPassword
};
