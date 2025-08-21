import {SidebarProvider, SidebarInset} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/app-sidebar"
import {ReactNode} from "react";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}


