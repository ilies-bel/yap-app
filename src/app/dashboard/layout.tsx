"use client"
import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/app-sidebar"
import {ReactNode} from "react";
import DroneScene from "@/app/dashboard/drone/drone-model/DroneScene";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className={"w-full"}>
                <DroneScene/>
                {children}
            </main>
        </SidebarProvider>
    )
}