import type { TLoginSchema } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validation';
import { FieldGroup } from '@/components/ui/field';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContextProvider';

export const LoginPage = () => {
    const { setIsLoginForm } = useAppContext();

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onsubmitHandle = (data: TLoginSchema) => {
        console.log('values: ', data);
        form.reset();
    };

    return (
        <div className="h-full space-y-20 flex flex-col items-center justify-center  w-full">
            <div className="text-center  w-full">
                <h2 className="font-medium">Sign In</h2>
                <p className=" text-xs max-md:mt-2 md:text-sm/10 text-muted-foreground/60">
                    Hey, welcome back,
                </p>
            </div>

            <div className="w-full md:max-w-md ">
                <form id="login-form" onSubmit={form.handleSubmit(onsubmitHandle)}>
                    <FieldGroup>
                        <FormInput
                            control={form.control}
                            type="email"
                            name="email"
                            id="usr-email"
                            label="User email"
                            placeholder="prashan.k@example.com"
                        />
                        <FormInput
                            control={form.control}
                            type="password"
                            name="password"
                            id="usr-password"
                            label="Password"
                            placeholder="********"
                        />
                    </FieldGroup>
                </form>

                <Button
                    className="mt-12 py-5 w-full md:max-w-md cursor-pointer"
                    type="submit"
                    form="login-form"
                >
                    Access account
                </Button>
                <p className="md:text-sm text-xs text-center mt-2 text-muted-foreground/60">
                    Don't have an account?{' '}
                    <Link
                        to="/"
                        onClick={() => setIsLoginForm(false)}
                        className="text-primary/80 hover:underline underline-offset-4"
                    >
                        Join
                    </Link>
                </p>
            </div>
        </div>
    );
};
