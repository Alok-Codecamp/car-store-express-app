import z from 'zod'


const loginValidationSchema = z.object({
    email: z.string({ required_error: 'Email is required!!' }),
    password: z.string({ required_error: 'Password is required' })
})
const forgetPasswordValidationSchema = z.object({

    email: z.string({ required_error: 'User email is required!' })
})
const resetPasswordValidationSchema = z.object({
    token: z.string({ required_error: 'User token is required!' }),
    email: z.string({ required_error: 'User email is required!' }),
    newPassword: z.string({ required_error: 'user password is required' }),
})

export const authValidations = {
    loginValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema
}