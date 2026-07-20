import { z } from 'zod';

export const roleSchema = z.enum(['Member', 'Manager', 'Admin']);

// User validations
export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
    .object({
        firstName: z.string().min(1, 'Name is required'),
        lastName: z.string().min(1, 'Name is required'),
        email: z.email(),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        regCode: z.string().min(4, 'Must be at least 4 character'),
        role: roleSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });

// we can use update data to validate
export const createProjectSchema = z.object({
    projectName: z
        .string()
        .min(3, 'Project name must be at least 3 characters')
        .max(100, 'Project name must be less than 100 characters'),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    assignedUserIds: z.array(z.number()).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();
