import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';

import { FieldGroup } from '@/components/ui/field';

import type { SelectItem, TCreateProjectSchema } from '@/types';
import { createProjectSchema } from '@/lib/validation';
import { FormInput } from '@/components/forms/FormInput';
import { FormTextarea } from '@/components/forms/FormTextArea';
import { RotateCcw } from 'lucide-react';
import { FormSelect } from '@/components/forms/FormSelect';
import { useAppContext } from '@/context/AppContextProvider';
import { Separator } from '@/components/ui/separator';

export function ProjectAddForm() {
    const { allUser } = useAppContext();

    const form = useForm<TCreateProjectSchema>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            projectName: '',
            description: '',
            assignedUserIds: [],
        },
    });

    const onSubmitHandle = async (data: TCreateProjectSchema) => {
        try {
            console.log('project values:', data);

            form.reset({
                projectName: '',
                description: '',
                assignedUserIds: [],
            });
        } catch (error) {
            console.log(error);
        }
    };

    const selectItems: SelectItem[] = allUser
        .filter((user) => user.role === 'Member')
        .map((user) => ({
            label: `${user.firstName} ${user.lastName}`,
            value: user.id,
        }));

    return (
        <div>
            <CardContent className="md:pb-12 pb-8">
                <form
                    id="project-create-form"
                    onSubmit={form.handleSubmit(onSubmitHandle)}
                    className="mx-auto max-w-3xl"
                >
                    <div className="pb-8">
                        <legend className="sr-only">Start new project with your team</legend>

                        <div className="mb-7 space-y-1 max-w-xl">
                            <h3 className="font-medium text-foreground max-sm:text-base">
                                Start new project with your team
                            </h3>
                            <p className="text-xs leading-4 text-muted-foreground/60 tracking-tight">
                                Enter a clear name and a short description for this project.
                            </p>
                        </div>
                        <Separator className="opacity-40" />
                    </div>

                    <FieldGroup className="gap-6 py-4">
                        <div className="flex md:justify-between md:items-center flex-col md:flex-row gap-6">
                            <FormInput
                                control={form.control}
                                name="projectName"
                                id="project-name"
                                label="Project Name"
                                placeholder="Customer Management"
                            />
                            <FormSelect
                                control={form.control}
                                name="assignedUserIds"
                                label="Assign Members"
                                placeholder="Select Members"
                                items={selectItems}
                                selectLabel="Members"
                                id="assignedUserIds"
                            />
                        </div>

                        <FormTextarea
                            control={form.control}
                            name="description"
                            id="project-description"
                            label="Description"
                            placeholder="Describe the project goals, scope, and intended outcome"
                            description="A concise description helps managers and members quickly understand the project."
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col-reverse gap-3 border-t border-border/50 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
                <div className="flex w-full gap-3 sm:w-auto md:mt-4 mt-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            form.reset({
                                projectName: '',
                                description: '',
                                assignedUserIds: [],
                            })
                        }
                        className="h-10 flex-1 rounded-xl px-5 sm:flex-none text-xs md:text-sm"
                    >
                        <RotateCcw className="md:mr-2 md:size-4 size-3" />
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        form="project-create-form"
                        className="h-10 flex-1 rounded-xl px-6 sm:flex-none text-xs md:text-sm"
                    >
                        Create project
                    </Button>
                </div>
            </CardFooter>
        </div>
    );
}
