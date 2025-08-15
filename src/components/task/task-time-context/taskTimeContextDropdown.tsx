"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Cloud, Minus, Moon, Sun} from "lucide-react"
import {useUpdateTask} from "@/services/api/task/useUpdateTask"
import {Task} from "@/services/api/task/taskService"
import React, {ReactElement} from "react";

interface TaskTimeContextDropdownProps {
    task: Task
}

type DayPeriod = 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING';

const timeContexts: { value: DayPeriod, label: string, icon: ReactElement }[] = [
    {value: 'MORNING', label: 'Morning', icon: <Sun className="h-4 w-4"/>},
    {value: 'AFTERNOON', label: 'Afternoon', icon: <Cloud className="h-4 w-4"/>},
    {value: 'EVENING', label: 'Evening', icon: <Moon className="h-4 w-4"/>},
    {value: 'NIGHT', label: 'Night', icon: <Moon className="h-4 w-4"/>},
];

const getTimeIcon = (timeContext: DayPeriod | null) => {
    const context = timeContexts.find(tc => tc.value === timeContext);
    return context?.icon || <Minus className="h-4 w-4 text-muted-foreground"/>;
}

export function TaskTimeContextDropdown({task}: TaskTimeContextDropdownProps) {
    const updateTask = useUpdateTask()

    const handleTimeContextChange = (timeContext: DayPeriod | null) => {
        console.log('Updating time context to:', timeContext);
        updateTask.mutate({
            id: task.id,
            timeContext: timeContext
        })
    }

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click when clicking dropdown
    }

    return (
        <div onClick={handleClick}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        {getTimeIcon(task.timeContext)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem
                        onClick={() => handleTimeContextChange(null)}
                        className={!task.timeContext ? "bg-accent" : ""}
                    >
                        <Minus className="h-4 w-4 mr-2 text-muted-foreground"/>
                        No time context
                    </DropdownMenuItem>
                    {timeContexts.map((tc) => (
                        <DropdownMenuItem
                            key={tc.value}
                            onClick={() => handleTimeContextChange(tc.value)}
                            className={task.timeContext === tc.value ? "bg-accent" : ""}
                        >
                            <span className="mr-2">
                                {tc.icon}
                            </span>
                            {tc.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}