"use client"

import { useSidebar } from "@/components/ui/sidebar"
import { CustomSidebarTrigger } from "@/components/sidebar/custom-sidebar-trigger"
import { cn } from "@/lib/utils"

export function SidebarToggleSection() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div className={cn(
      "flex mb-2",
      isCollapsed ? "justify-center px-0" : "justify-end px-2"
    )}>
      <CustomSidebarTrigger />
    </div>
  )
}