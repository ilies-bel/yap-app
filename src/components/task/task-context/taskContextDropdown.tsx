"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {ChevronDown} from "lucide-react"
import {useAllContexts} from "@/services/api/context/useAllContexts"
import {useUpdateTask} from "@/services/api/task/useUpdateTask"
import {Task} from "@/services/api/task/taskService"
import React from "react";

interface TaskContextDropdownProps {
    task: Task
}

export function TaskContextDropdown({task}: TaskContextDropdownProps) {
    const {data: contexts = []} = useAllContexts()
    const updateTask = useUpdateTask()

    const handleContextChange = (contextName: string | null) => {
        updateTask.mutate({
            id: task.id,
            contextName: contextName
        })
    }

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click when clicking dropdown
    }

    return (
        <div onClick={handleClick}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        {task.context?.name || 'No context'}
                        <ChevronDown className="ml-1 h-3 w-3"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem
                        onClick={() => handleContextChange(null)}
                        className={!task.context ? "bg-accent" : ""}
                    >
                        No context
                    </DropdownMenuItem>
                    {contexts.map((context) => (
                        <DropdownMenuItem
                            key={context.id}
                            onClick={() => handleContextChange(context.name)}
                            className={task.context?.name === context.name ? "bg-accent" : ""}
                        >
                            {context.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}