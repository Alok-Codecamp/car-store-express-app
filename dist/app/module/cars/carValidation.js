"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSchema = void 0;
const zod_1 = require("zod");
// Define the CarCategory union type in Zod
const CarCategoryEnum = zod_1.z.enum([
    "Sedan",
    "Hatchback",
    "SUV",
    "Crossover",
    "Coupe",
    "Convertible",
]);
// Define the Zod schema for ICars
exports.carSchema = zod_1.z.object({
    brand: zod_1.z.string().min(1, "Brand is required"),
    model: zod_1.z.string().min(1, "Model is required"),
    year: zod_1.z.string().min(4, "year is required").max(4),
    price: zod_1.z.string().min(1, "Price must be a positive number"),
    category: CarCategoryEnum,
    description: zod_1.z.string().min(5, "Description must be at least 5 characters"),
    quantity: zod_1.z.number().int().nonnegative("Quantity must be a non-negative integer"),
    inStock: zod_1.z.boolean(),
    photoUrl: zod_1.z.string().min(1, "Photo url is required"),
});
