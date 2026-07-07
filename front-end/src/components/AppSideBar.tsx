import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
// import { Link } from 'react-router-dom';

export const AppSideBar = () => {
    return (
        <Sidebar>
            {/* sidebar header icon place */}
            <SidebarHeader className="p-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2">
                            <div className="rounded-md bg-primary aspect-square max-w-10 flex items-center justify-center px-4">
                                <p className="font-mono text-primary-foreground text-sm">RG</p>
                            </div>
                            <div>
                                <p className="font-semibold">
                                    ReGen <span className="font-mono">7</span>
                                </p>
                                <p className="text-xs/2 text-muted-foreground/60 font-medium">
                                    Team Member
                                </p>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <Separator className='opacity-20' />

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};
