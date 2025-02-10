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
exports.userController = void 0;
const asyncWraper_1 = __importDefault(require("../../utils/asyncWraper"));
const responseSender_1 = __importDefault(require("../../utils/responseSender"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const createUser = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.userService.createUserIntoDb(userData);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'congratulations! registration successfully.',
        data: result,
    });
}));
const getAllUser = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_service_1.userService.getAllUserFromDb();
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'users retrive successfully.',
        data: allUser,
    });
}));
const getUserByEmail = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.userEmail);
    const result = yield user_service_1.userService.getUserByIdFromDb(req.params.userEmail);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'users retrive successfully.',
        data: result,
    });
}));
const updateUser = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateUserFromDb(req.params.userEmail, req.body);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'users updated successfully.',
        data: result,
    });
}));
const changePassword = (0, asyncWraper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.changePasswordFromDb(req.params.userEmail, req.body);
    (0, responseSender_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'password changed.',
        data: result,
    });
}));
exports.userController = {
    createUser,
    getAllUser,
    getUserByEmail,
    updateUser,
    changePassword,
};
