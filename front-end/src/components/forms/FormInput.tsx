import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { FormInputProps } from '@/types';
import { Controller, type FieldValues } from 'react-hook-form';

export function FormInput<T extends FieldValues>({
    control,
    name,
    label,
    type = 'text',
    placeholder,
    id,
}: FormInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>
                    <Input
                        {...field}
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        className="placeholder:text-muted-foreground/80 placeholder:text-xs md:placeholder:text-sm rounded-xl cursor-pointer"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
