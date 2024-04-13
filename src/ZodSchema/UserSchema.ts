import { z } from 'zod';

export const SignUpSchema = z.object({
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters long'
    }),
    email: z.string().email().refine(value => !!value, {
        message: 'Email is required'
    }),
    password: z.string()
    .min(8, {message: 'Password must be at least 8 characters long'})
    .max(15, {message: 'Password must be at most 15 characters long'})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one number'
    })
    .refine(value => !!value, {
        message: 'Password is required'
    }),
    confirmpassword: z.string()
    .min(8, {message: 'Password must be at least 8 characters long'})
    .max(15, {message: 'Password must be at most 15 characters long'})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one number'
    })
    .refine(value => !!value, {
        message: 'Password is required'
    }),

}).refine((data) => data.password === data.confirmpassword, {
    message: 'Passwords do not match',
    path: ['confirmpassword']
})