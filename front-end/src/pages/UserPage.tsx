import { assets } from '@/assets/assets';
import { Container } from '@/components/layout/Container';
import { Separator } from '@/components/ui/separator';
import { Outlet } from 'react-router-dom';

export const UserPage = () => {


    return (
        <div className="min-h-dvh ">
            <Container>
                <div className="grid grid-cols-12 md:gap-4 min-h-dvh  min-w-full content-center">
                    <div className="col-span-12 md:col-span-6 content-p max-sm:py-20">
                        {/* Login and register form section - left */}
                        <Outlet/>
                    </div>

                    {/* right side components in user login and register form*/}

                    <div className=" hidden md:block md:col-span-6 md:max-lg:p-8 lg:p-12 rounded-4xl bg-primary shadow-none relative min-h-[80dvh]">
                        <img
                            src={assets.patternIMG}
                            alt="pattern-img"
                            className="absolute inset-0 object-cover h-full rounded-4xl opacity-2"
                        />

                        <div className="flex items-start justify-center h-full flex-col z-12">
                            <h2 className="font-heading text-primary-foreground font-medium">
                                Generate weekly reports and track team progress.
                            </h2>
                            <Separator className="mt-4 opacity-20 md:max-w-xs xl:max-w-sm" />
                            <p className="text-muted/96 leading-7 mt-4 text-balance">
                                Welcome to{' '}
                                <span className="underline underline-offset-5 font-normal">
                                    ReGen<span className="font-mono">7</span>
                                </span>{' '}
                                generate, submit and manage weekly reports with a simple team
                                dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
