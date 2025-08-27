"use client"
import { Task } from "@/services/api/task/taskService"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TaskStatusDropdown } from "@/components/task/task-status/taskStatusDropdown"
import { TaskTagDropdown } from "@/components/task/task-tag/taskTagDropdown"

interface TaskCardProps {
    task: Task
    onClick?: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
    return (
        <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onClick?.(task)}
        >
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-base flex-1 mr-2">{task.name}</h3>
                    <TaskStatusDropdown task={task} />
                </div>
                
                {task.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {task.description}
                    </p>
                )}
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {task.context && (
                            <Badge variant="outline" className="text-xs">
                                {task.context.name}
                            </Badge>
                        )}
                        {task.dueDate && (
                            <Badge 
                                variant="secondary" 
                                className={getDueDateStyle(task.dueDate)}
                            >
                                {formatDueDate(task.dueDate)}
                            </Badge>
                        )}
                    </div>
                    <TaskTagDropdown task={task} />
                </div>
            </CardContent>
        </Card>
    )
}

function getDueDateStyle(dueDate: string): string {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)
    
    if (due < today) {
        return "bg-red-100 text-red-700"
    } else if (due.getTime() === today.getTime()) {
        return "bg-orange-100 text-orange-700"
    }
    return ""
}

function formatDueDate(dueDate: string): string {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)
    
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays === -1) return "Yesterday"
    if (diffDays < -1) return `${Math.abs(diffDays)} days overdue`
    if (diffDays < 7) return `In ${diffDays} days`
    
    return due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}