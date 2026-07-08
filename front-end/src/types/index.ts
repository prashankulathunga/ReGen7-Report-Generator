import { z } from 'zod';
import type { loginSchema, registerSchema } from '@/lib/validation';
import type { FieldValues, Control, FieldPath } from 'react-hook-form';
import type { HTMLInputTypeAttribute } from 'react';

// zod schema types
export type TLoginSchema = z.infer<typeof loginSchema>;

export type TRegisterSchema = z.infer<typeof registerSchema>;

export type TAuthUser = Omit<TRegisterSchema, 'password' | 'confirmPassword'> & {
    id: string;
};

// Form input types
export type FormInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    id: string;
};

export type FormSelectProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    items: Array<{
        label: string;
        value: string;
    }>;
    placeholder?: string;
    selectLabel?: string;
    id: string;
};

export type SelectItem = {
    label: string;
    value: string;
};
