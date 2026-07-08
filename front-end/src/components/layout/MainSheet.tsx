import { AppSideBar } from '@/components/AppSideBar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export const MainSheet = () => {
    return (
        <SidebarProvider>
            <AppSideBar />
            <SidebarInset>
                <main className="w-full">
                    <SidebarTrigger className="p-6 cursor-pointer" />
                    <Separator className="opacity-20" />
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};
