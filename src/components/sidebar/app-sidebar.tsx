"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Calendar, Home, Inbox, Settings, Zap} from "lucide-react";
import {LogOutSidebarMenuButton} from "@/components/sidebar/log-out-sidebar-menu-button";
import {SidebarToggleSection} from "@/components/sidebar/sidebar-toggle-section";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {ChatPopup} from "@/components/chat/chatPopup";

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Capture",
        url: "/dashboard/capture",
        icon: Zap,
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
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-row items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">YAP</span>
                </div>
                <ChatPopup />
            </SidebarHeader>
            
            <SidebarContent className={"py-2 relative"}>
                <SidebarToggleSection/>
                <SidebarMenu className="px-2">
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

            <SidebarFooter className={"p-2 px-4"}>

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


