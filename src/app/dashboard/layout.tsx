import {SidebarProvider, SidebarInset} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/app-sidebar"
import {ReactNode} from "react";
import {Chat} from "@/components/chat/chat";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className={"pb-4"}>
                        <Chat/>
                    </div>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}


