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
exports.authValidator = void 0;
const asyncWraper_1 = __importDefault(require("../utils/asyncWraper"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("../module/auth/auth.utils");
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = require("../module/user/user.model");
const authValidator = (...requiredRoles) => {
    return (0, asyncWraper_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // Check if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized user!');
        }
        const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
        const { email, role, iat } = decoded;
        const existingUser = yield user_model_1.UserModel.isUserExistsByEmail(email);
        //check if the user is missing
        if (!existingUser) {
            throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'User not found!');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, `you are unauthorized. please login!`);
        }
        req.user = decoded;
        next();
    }));
};
exports.authValidator = authValidator;
