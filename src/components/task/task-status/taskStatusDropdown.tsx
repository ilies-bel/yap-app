"use client"

import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select"
import {Status} from "@/services/api/status"
import {useUpdateTaskStatus} from "@/services/api/task/useUpdateTaskStatus"
import {Edit3Icon} from "lucide-react"
import {Task} from "@/services/api/task/taskService"

interface TaskStatusDropdownProps {
    task: Task
}

const statusLabels: Record<Status, string> = {
    [Status.TO_REFINE]: 'To Refine',
    [Status.SOMEDAY]: 'Someday',
    [Status.TODO]: 'To Do',
    [Status.IN_PROGRESS]: 'In Progress',
    [Status.DONE]: 'Done'
}

export function TaskStatusDropdown({task}: TaskStatusDropdownProps) {
    const updateTaskStatus = useUpdateTaskStatus()

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
            <Select value={task.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-6 h-6 p-0 border-none bg-transparent hover:bg-gray-100 rounded">
                    <Edit3Icon className="h-4 w-4 text-gray-600"/>
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(statusLabels).map(([status, label]) => (
                        <SelectItem key={status} value={status}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}