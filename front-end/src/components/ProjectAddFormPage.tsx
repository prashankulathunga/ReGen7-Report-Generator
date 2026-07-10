import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { FieldGroup } from '@/components/ui/field';

import type { TCreateProjectSchema } from '@/types';
import { createProjectSchema } from '@/lib/validation';
import { FormInput } from '@/components/forms/FormInput';
import { FormTextarea } from '@/components/forms/FormTextArea';

export function ProjectAddForm() {
    const form = useForm<TCreateProjectSchema>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: '',
            description: '',
            assignedUserIds: [],
        },
    });

    const onSubmitHandle = async (data: TCreateProjectSchema) => {
        try {
            console.log('project values:', data);

            form.reset({
                name: '',
                description: '',
                assignedUserIds: [],
            });
        } catch (error) {
            console.log(error);
            //   toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <CardHeader>
                <CardTitle>Create Project</CardTitle>
                <CardDescription className='text-xs md:text-sm text-muted-foreground/60'>
                    Add a new project or category and optionally assign team members.
                </CardDescription>
            </CardHeader>

            <CardContent className='md:mt-10 mt-8'>
                <form id="project-create-form" onSubmit={form.handleSubmit(onSubmitHandle)}>
                    <FieldGroup>
                        <FormInput
                            control={form.control}
                            name="name"
                            id="project-name"
                            label="Project Name"
                            placeholder="Internal Tooling"
                        />

                        <FormTextarea
                            control={form.control}
                            name="description"
                            id="project-description"
                            label="Description"
                            placeholder="Write a short description about this project..."
                            description="This helps managers and members understand the project purpose."
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex justify-end gap-3 md:mt-8 mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                        form.reset({
                            name: '',
                            description: '',
                            assignedUserIds: [],
                        })
                    }
                >
                    Reset
                </Button>

                <Button type="submit" form="project-create-form">
                    Create Project
                </Button>
            </CardFooter>
        </div>
    );
}
