import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/app-sidebar"
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className={"w-full"}>
                {children}
            </main>
        </SidebarProvider>
    )
}