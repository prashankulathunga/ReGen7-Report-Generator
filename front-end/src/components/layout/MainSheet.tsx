import { AppSideBar } from '@/components/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export const MainSheet = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSideBar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};
