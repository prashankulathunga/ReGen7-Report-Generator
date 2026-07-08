import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAppContext } from '@/context/AppContextProvider';
import { ReceiptText, LayoutDashboard, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const AppSideBar = () => {
    const path = useLocation().pathname;

    const { user } = useAppContext();

    useEffect(() => {
        console.log(user);
    }, []);

    const items = [
        {
            title: 'Dashboard',
            url: '/',
            icon: LayoutDashboard,
        },
        {
            title: 'Report',
            url: '/report',
            icon: ReceiptText,
        },
    ];

    return (
        <Sidebar>
            {/* sidebar header icon place */}
            <SidebarHeader className="p-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary aspect-square flex items-center justify-center px-3">
                                <p className="font-mono text-primary-foreground text-sm">RG7</p>
                            </div>
                            <div>
                                <p className="font-semibold">
                                    ReGen <span className="font-mono">7</span>
                                </p>
                                <p className="text-xs/3 text-muted-foreground/60 font-medium uppercase">
                                    {user.role}
                                </p>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Tasks</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-2 space-y-0.5">
                            {items.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <Link to={item.url}>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={path === item.url}
                                            className="rounded-sm"
                                        >
                                            {item.icon && <item.icon />}
                                            <span className="text-xs md:text-sm">{item.title}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="rounded-sm text-xs md:text-sm hover:text-destructive hover:bg-transparent text-muted-foreground/80">
                            <LogOut /> Log Out
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <Separator className="opacity-20" />
            <SidebarFooter />
        </Sidebar>
    );
};
