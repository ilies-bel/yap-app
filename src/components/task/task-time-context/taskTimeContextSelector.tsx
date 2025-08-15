"use client"
import {Button} from "@/components/ui/button"
import {Cloud, Moon, Sun} from "lucide-react"
import {useUpdateTask} from "@/services/api/task/useUpdateTask"
import {Task} from "@/services/api/task/taskService"
import React from "react";
import {cn} from "@/lib/utils";

interface TaskTimeContextSelectorProps {
    task: Task
}

type DayPeriod = 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING';

const timeContexts: { value: DayPeriod, label: string, icon: React.ReactElement }[] = [
    {value: 'MORNING', label: 'Morning', icon: <Sun className="h-4 w-4"/>},
    {value: 'AFTERNOON', label: 'Afternoon', icon: <Cloud className="h-4 w-4"/>},
    {value: 'EVENING', label: 'Evening', icon: <Moon className="h-4 w-4"/>},
    {value: 'NIGHT', label: 'Night', icon: <Moon className="h-4 w-4 fill-current"/>},
];

export function TaskTimeContextSelector({task}: TaskTimeContextSelectorProps) {
    const updateTask = useUpdateTask()

    const handleTimeContextChange = (timeContext: DayPeriod) => {
        // If clicking the already selected context, deselect it
        const newContext = task.timeContext === timeContext ? null : timeContext;
        updateTask.mutate({
            id: task.id,
            timeContext: newContext
        })
    }

    return (
        <div className="flex gap-2">
            {timeContexts.map((tc) => (
                <div key={tc.value} className="text-center">
                    <Button
                        variant={task.timeContext === tc.value ? "default" : "outline"}
                        size="icon"
                        className={cn(
                            "h-10 w-10",
                            task.timeContext === tc.value && "ring-2 ring-primary ring-offset-2"
                        )}
                        onClick={() => handleTimeContextChange(tc.value)}
                        title={tc.label}
                    >
                        {tc.icon}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">{tc.label}</p>
                </div>
            ))}
        </div>
    )
}