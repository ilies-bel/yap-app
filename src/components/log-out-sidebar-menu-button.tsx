"use client"
import {useAuth} from "@/lib/auth/UseAuth";
import {LogOut} from "lucide-react";
import {SidebarMenuButton} from "@/components/ui/sidebar";

export function LogOutSidebarMenuButton() {
    const {logout} = useAuth();
    return (
        <SidebarMenuButton onClick={logout}>
            <LogOut/>
            <span>Log out</span>
        </SidebarMenuButton>
    )
}