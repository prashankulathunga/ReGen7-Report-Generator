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
import { RotateCcw } from 'lucide-react';

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
            {/* Decorative background */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-72 rounded-full bg-violet-500/10 blur-3xl"
            />

            <CardHeader className="border-b border-border/50 px-5 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                                <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                                    Create Project
                                </CardTitle>
                            </div>

                            <CardDescription className="max-w-2xl md:text-sm leading-6 text-muted-foreground/60 text-xs text-balance">
                                Create a project workspace and provide the information your team
                                needs to understand its purpose.
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="px-5 py-7 sm:px-8 sm:py-10">
                <form
                    id="project-create-form"
                    onSubmit={form.handleSubmit(onSubmitHandle)}
                    className="mx-auto max-w-3xl"
                >
                    <fieldset>
                        <legend className="sr-only">Project information</legend>

                        <div className="mb-7 space-y-1">
                            <h3 className="text-sm font-semibold text-foreground">
                                Project information
                            </h3>
                            <p className="text-xs leading-5 text-muted-foreground">
                                Enter a clear name and a short description for this project.
                            </p>
                        </div>

                        <FieldGroup className="gap-6">
                            <FormInput
                                control={form.control}
                                name="name"
                                id="project-name"
                                label="Project Name"
                                placeholder="e.g. Internal Tooling"
                            />

                            <FormTextarea
                                control={form.control}
                                name="description"
                                id="project-description"
                                label="Description"
                                placeholder="Describe the project goals, scope, and intended outcome..."
                                description="A concise description helps managers and members quickly understand the project."
                            />
                        </FieldGroup>
                    </fieldset>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col-reverse gap-3 border-t border-border/50 bg-muted/20 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-center text-xs text-muted-foreground sm:text-left">
                    You can assign team members after creating the project.
                </p>

                <div className="flex w-full gap-3 sm:w-auto">
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
                        className="h-10 flex-1 rounded-xl px-5 sm:flex-none"
                    >
                        <RotateCcw className="mr-2 size-4" />
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        form="project-create-form"
                        className="h-10 flex-1 rounded-xl px-6 sm:flex-none"
                    >
                        Create Project
                    </Button>
                </div>
            </CardFooter>
        </div>
    );
}
