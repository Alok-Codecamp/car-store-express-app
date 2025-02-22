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
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncWraper_1 = __importDefault(require("../../utils/asyncWraper"));
const responseSender_1 = __importDefault(require("../../utils/responseSender"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config/config"));
const login = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.login(req.body);
    const { accessToken, refreshToken, } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.appMood === 'production',
        httpOnly: true
    });
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.ACCEPTED,
        success: true,
        message: 'login successfully',
        data: accessToken
    });
}));
const refreshToken = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    console.log('refresh token', refreshToken);
    const result = yield auth_service_1.authServices.refreshToken(refreshToken);
    console.log('result', result);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.ACCEPTED,
        success: true,
        message: 'refresh token generated',
        data: result
    });
}));
const forgetPassword = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userEmail = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    console.log(userEmail);
    const result = yield auth_service_1.authServices.forgetPassword(userEmail);
    console.log(result);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'check email for reset password',
        data: result
    });
}));
const resetPassword = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const result = yield auth_service_1.authServices.resetPassword(req.body);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'password reset successfully',
        data: result
    });
}));
exports.authController = {
    login,
    refreshToken,
    forgetPassword,
    resetPassword
};
