"use client"
import { useState } from "react"
import { Task } from "@/services/api/task/taskService"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TaskSectionProps {
    title: string
    tasks: Task[]
    variant?: "default" | "urgent" | "upcoming"
    defaultExpanded?: boolean
    children: React.ReactNode
}

export function TaskSection({ 
    title, 
    tasks, 
    variant = "default",
    defaultExpanded = true,
    children 
}: TaskSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)
    
    const variantStyles = {
        default: "text-foreground",
        urgent: "text-red-600",
        upcoming: "text-gray-600"
    }
    
    const count = tasks.length
    
    if (count === 0 && variant === "urgent") {
        return null
    }
    
    return (
        <div className="mb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                    <h2 className={cn(
                        "text-lg font-semibold",
                        variantStyles[variant]
                    )}>
                        {title}
                    </h2>
                    <span className={cn(
                        "px-2 py-1 text-sm font-medium rounded-full",
                        variant === "urgent" && "bg-red-100 text-red-700",
                        variant === "upcoming" && "bg-gray-100 text-gray-700",
                        variant === "default" && "bg-primary/10 text-primary"
                    )}>
                        {count}
                    </span>
                </div>
            </button>
            
            {isExpanded && (
                <div className="mt-2 space-y-2 px-3">
                    {children}
                </div>
            )}
        </div>
    )
}