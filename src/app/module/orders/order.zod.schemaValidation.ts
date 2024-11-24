import z from 'zod'


const orderZodSchema = z.object({
    email: z.string(),
    car: z.string(),
    quantity: z.number().min(1, 'Minimum order quantity should be 1'),
    totalPrice: z.number()
})

export default orderZodSchema;