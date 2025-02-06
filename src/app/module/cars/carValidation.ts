import { z } from "zod";

// Define the CarCategory union type in Zod
const CarCategoryEnum = z.enum([
    "Sedan",
    "Hatchback",
    "SUV",
    "Crossover",
    "Coupe",
    "Convertible",
]);

// Define the Zod schema for ICars
export const carSchema = z.object({
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    year: z.string().min(4, "year is required").max(4),
    price: z.string().min(1, "Price must be a positive number"),
    category: CarCategoryEnum,
    description: z.string().min(5, "Description must be at least 5 characters"),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    inStock: z.boolean(),
    photoUrl: z.string().min(1, "Photo url is required"),
});

// Export the type inferred from the Zod schema
export type ICarsSchema = z.infer<typeof carSchema>;
