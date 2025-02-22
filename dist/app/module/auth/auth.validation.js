"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const loginValidationSchema = zod_1.default.object({
    email: zod_1.default.string({ required_error: 'Email is required!!' }),
    password: zod_1.default.string({ required_error: 'Password is required' })
});
const forgetPasswordValidationSchema = zod_1.default.object({
    email: zod_1.default.string({ required_error: 'User email is required!' })
});
const resetPasswordValidationSchema = zod_1.default.object({
    token: zod_1.default.string({ required_error: 'User token is required!' }),
    email: zod_1.default.string({ required_error: 'User email is required!' }),
    newPassword: zod_1.default.string({ required_error: 'user password is required' }),
});
exports.authValidations = {
    loginValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
};
