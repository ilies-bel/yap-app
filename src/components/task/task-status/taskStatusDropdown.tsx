"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Status} from "@/services/api/status"
import {useUpdateTaskStatus} from "@/services/api/task/useUpdateTaskStatus"
import {Circle, CircleDot, CheckCircle2, Clock, Sparkles} from "lucide-react"
import {Task} from "@/services/api/task/taskService"

interface TaskStatusDropdownProps {
    task: Task
}

const statusConfig: Record<Status, {label: string, icon: React.ComponentType<{className?: string}>, color: string}> = {
    [Status.TO_REFINE]: {
        label: 'To Refine',
        icon: Sparkles,
        color: 'text-purple-500'
    },
    [Status.SOMEDAY]: {
        label: 'Someday',
        icon: Circle,
        color: 'text-gray-400'
    },
    [Status.TODO]: {
        label: 'To Do',
        icon: Circle,
        color: 'text-blue-500'
    },
    [Status.IN_PROGRESS]: {
        label: 'In Progress',
        icon: CircleDot,
        color: 'text-yellow-500'
    },
    [Status.DONE]: {
        label: 'Done',
        icon: CheckCircle2,
        color: 'text-green-500'
    }
}

export function TaskStatusDropdown({task}: TaskStatusDropdownProps) {
    const updateTaskStatus = useUpdateTaskStatus()
    const currentStatus = statusConfig[task.status]
    const Icon = currentStatus.icon

    const handleStatusChange = (newStatus: Status) => {
        updateTaskStatus.mutate({
            taskId: task.id,
            status: newStatus
        })
    }

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent row click when using dropdown
    }

    return (
        <div onClick={handleClick}>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
                        <Icon className={`h-5 w-5 ${currentStatus.color}`}/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {Object.entries(statusConfig).map(([status, config]) => {
                        const ItemIcon = config.icon
                        return (
                            <DropdownMenuItem
                                key={status}
                                onClick={() => handleStatusChange(status as Status)}
                                className="flex items-center space-x-2"
                            >
                                <ItemIcon className={`h-4 w-4 ${config.color}`}/>
                                <span>{config.label}</span>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}