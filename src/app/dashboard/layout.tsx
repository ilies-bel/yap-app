import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/sidebar/app-sidebar"
import {ReactNode} from "react";
import {Chat} from "@/components/chat/chat";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className={"w-full"}>
                <div className={"pb-4"}>
                    <Chat/>
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}


