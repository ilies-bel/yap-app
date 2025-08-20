"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomSidebarTriggerProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function CustomSidebarTrigger({ className, onClick, ...props }: CustomSidebarTriggerProps) {
  const { toggleSidebar, state } = useSidebar()

  const isCollapsed = state === "collapsed"

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 transition-all",
        isCollapsed && "h-8 w-8",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      {...props}
    >
      {isCollapsed ? (
        <Plus className="h-4 w-4" />
      ) : (
        <Minus className="h-4 w-4" />
      )}
      <span className="sr-only">
        {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      </span>
    </Button>
  )
}