import { AppSideBar } from '@/components/AppSideBar';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export const MainSheet = () => {
    return (
        <SidebarProvider>
            <AppSideBar />
            <main>
                <SidebarTrigger className="p-6 cursor-pointer" />
                <Separator className="opacity-32" />
                <Outlet/>
            </main>
        </SidebarProvider>
    );
};
