import { FormInput } from '@/components/forms/FormInput';
import { FormSelect } from '@/components/forms/FormSelect';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useAppContext } from '@/context/AppContextProvider';
import { registerSchema } from '@/lib/validation';
import type { SelectItem, TRegisterSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const RegisterForm = () => {

const { setIsLoginForm } = useAppContext();

    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            regCode: '',
            role: 'member',
        },
    });

    const onsubmitHandle = (data: TRegisterSchema) => {
        console.log('values: ', data);
        form.reset();
    };

    const selectItems: SelectItem[] = [
        { label: 'Member', value: 'member' },
        { label: 'Manager', value: 'manager' },
        { label: 'Admin', value: 'admin' },
    ];

    return (
        <div className="h-full space-y-20 flex flex-col items-center justify-center  w-full">
            <div className="text-center  w-full">
                <h2 className="font-medium">Sign Up</h2>
                <p className=" text-xs max-md:mt-2 md:text-sm/10 text-muted-foreground/60">
                    Hello, how are you?,
                </p>
            </div>

            <div className="w-full md:max-w-md ">
                <form id="login-form" onSubmit={form.handleSubmit(onsubmitHandle)}>
                    <FieldGroup>
                        <div className="flex sm:items-center sm:justify-between sm:gap-2 sm:flex-row flex-col justify-center max-sm:space-y-7">
                            <FormInput
                                control={form.control}
                                type="text"
                                name="firstName"
                                id="f-name"
                                label="First name"
                                placeholder="Prashan"
                            />
                            <FormInput
                                control={form.control}
                                type="text"
                                name="lastName"
                                id="l-name"
                                label="Last name"
                                placeholder="Kulathunga"
                            />
                        </div>
                        <FormInput
                            control={form.control}
                            type="email"
                            name="email"
                            id="usr-email"
                            label="User email"
                            placeholder="prashan.k@example.com"
                        />

                        <div className="flex sm:items-center sm:justify-between sm:gap-2 sm:flex-row flex-col justify-center max-sm:space-y-7">
                            <FormInput
                                control={form.control}
                                type="password"
                                name="password"
                                id="usr-password"
                                label="Password"
                                placeholder="********"
                            />
                            <FormInput
                                control={form.control}
                                type="password"
                                name="confirmPassword"
                                id="usr-password-conf"
                                label="Confirm password"
                                placeholder="********"
                            />
                        </div>

                        <div className="flex sm:items-center sm:justify-between sm:gap-2 sm:flex-row flex-col justify-center max-sm:space-y-7">
                            <FormInput
                                control={form.control}
                                type="text"
                                name="regCode"
                                id="reg-code"
                                label="Register code"
                                placeholder="xxxx"
                            />

                            <FormSelect
                                control={form.control}
                                name="role"
                                id="role"
                                label="User role"
                                placeholder="select"
                                selectLabel="USER ROLE"
                                items={selectItems}
                            />
                        </div>
                    </FieldGroup>
                </form>

                <Button
                    className="mt-12 py-5 w-full md:max-w-sm cursor-pointer"
                    type="submit"
                    form="login-form"
                >
                    Create an account
                </Button>
                <p className="md:text-sm text-xs text-center mt-2 text-muted-foreground/60">
                    If you have an account?{' '}
                    <Link to="/" onClick={() => setIsLoginForm(true)} className="text-primary/80 hover:underline underline-offset-4">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
