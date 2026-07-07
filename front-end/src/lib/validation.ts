// zod validations
import { z } from 'zod';

export const roleSchema = z.enum(['member', 'manager', 'admin']);

// User validations
export const loginSchema = z.object({
    email: z.email({ pattern: z.regexes.email }),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
    .object({
        firstName: z.string().min(1, 'Name is required'),
        lastName: z.string().min(1, 'Name is required'),
        email: z.email({ pattern: z.regexes.email }),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        regCode: z.string().min(2, 'Must be at least 4 character'),
        role: roleSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });
