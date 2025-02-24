"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required!"),
    email: zod_1.z.string().email("Invalid email address!").nonempty("Email is required!"),
    password: zod_1.z.string().nonempty("Password is required!"),
    role: zod_1.z.enum(['admin', 'user']).optional(), // Replace this with your specific roles
    address: zod_1.z.string().optional(),
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
