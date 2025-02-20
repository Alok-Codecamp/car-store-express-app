import { z } from "zod";





const createUserValidationSchema = z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().email("Invalid email address!").nonempty("Email is required!"),
    password: z.string().nonempty("Password is required!"),
    role: z.enum(['admin', 'user']).optional(), // Replace this with your specific roles
    address: z.string().optional(),
});
const updateUserValidationSchema = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
});

export const userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
