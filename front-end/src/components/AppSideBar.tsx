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
    SidebarMenuBadge,
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
            title: user.role ? user.role + ' Dashboard' : 'Dashboard',
            url: '/',
            count: null,
            icon: LayoutDashboard,
        },
        {
            title: user.role != 'Member' ? 'All Report' : 'Report',
            url: '/report',
            count: 28,
            icon: ReceiptText,
        },
    ];

    return (
        <Sidebar variant='inset'>
            {/* sidebar header icon place */}
            <SidebarHeader className="p-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2">
                            <div className="rounded-sm bg-primary aspect-square flex items-center justify-center px-3">
                                <p className="font-mono text-primary-foreground text-sm">RG7</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    ReGen <span className="font-mono">7</span>
                                </h3>
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
                        <SidebarMenu className="space-y-0.5">
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
                                        <SidebarMenuBadge className="text-muted-foreground/60 font-mono">
                                            {item?.count}
                                        </SidebarMenuBadge>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <Separator className="opacity-20" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="rounded-sm text-xs md:text-sm hover:text-destructive hover:bg-transparent text-muted-foreground/80">
                            <LogOut /> <span className="sr-only">Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
