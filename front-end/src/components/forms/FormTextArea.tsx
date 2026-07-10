import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';

type FormTextareaProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
    placeholder?: string;
    id: string;
    description?: string;
};

export function FormTextarea<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    id,
    description,
}: FormTextareaProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>

                    <Textarea
                        {...field}
                        id={id}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        className="min-h-28 resize-none rounded-xl placeholder:text-muted-foreground/80 placeholder:text-xs md:placeholder:text-sm"
                    />

                    {description && <FieldDescription className='text-xs md:text-sm text-muted-foreground/60'>{description}</FieldDescription>}

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
