"use client"

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
import {usePathname} from "next/navigation";
import Link from "next/link";

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "/dashboard/inbox",
        icon: Inbox,
    },
    {
        title: "Next actions",
        url: "/dashboard/next-actions",
        icon: Calendar,
    }
]

export function AppSidebar() {
    const pathname = usePathname()

    const isActive = (url: string) => {
        if (url === '/dashboard') {
            return pathname === '/dashboard'
        }
        return pathname.startsWith(url)
    }

    return (
        <Sidebar>

            <SidebarContent className={"p-4"}>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                <Link href={item.url}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className={"p-4"}>

                <SidebarMenuButton asChild isActive={pathname === '/settings'}>
                    <Link href={"/settings"}>
                        <Settings/>
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
                <LogOutSidebarMenuButton/>
            </SidebarFooter>
        </Sidebar>
    )
}


