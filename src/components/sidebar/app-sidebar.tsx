import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Calendar, Home, Inbox, Settings} from "lucide-react";
import {LogOutSidebarMenuButton} from "@/components/sidebar/log-out-sidebar-menu-button";

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Next actions",
        url: "#",
        icon: Calendar,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>

            <SidebarContent className={"p-4"}>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className={"p-4"}>

                <SidebarMenuButton asChild>
                    <a href={"/settings"}>
                        <Settings/>
                        <span>Settings</span>
                    </a>
                </SidebarMenuButton>
                <LogOutSidebarMenuButton/>
            </SidebarFooter>
        </Sidebar>
    )
}


