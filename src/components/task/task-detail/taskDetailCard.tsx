"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {StatusBadge} from "@/components/ui/status-badge"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CalendarIcon, FileTextIcon, MapPinIcon, Clock} from "lucide-react"
import {Status} from "@/services/api/status"
import {Difficulty} from "@/services/api/difficulty"
import {TaskTitle} from "@/components/task/task-title/taskTitle"
import {TaskContextDropdown} from "@/components/task/task-context/taskContextDropdown"
import {TaskTimeContextSelector} from "@/components/task/task-time-context/taskTimeContextSelector"
import {Task} from "@/services/api/task/taskService"

interface TaskDetailCardProps {
    task: Task | null
    onClose: () => void
}

export function TaskDetailCard({task, onClose}: TaskDetailCardProps) {
    if (!task) return null

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "No due date"
        return new Date(dateString).toLocaleDateString()
    }

    return (
        <Dialog open={!!task} onOpenChange={onClose}>
            <DialogContent className="max-w-[400px] w-full">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex-1 pr-4 max-w-[400px]">
                            <TaskTitle title={task.name} showFullOnHover={false}/>
                        </div>
                        <StatusBadge status={task.status}/>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <FileTextIcon className="h-4 w-4"/>
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm">
                                {task.description || "No description provided"}
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4"/>
                                Due Date
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm">
                                {formatDate(task.dueDate)}
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <MapPinIcon className="h-4 w-4"/>
                                Context
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <TaskContextDropdown task={task}/>
                                <span className="text-sm text-muted-foreground">
                                    {task.context?.name || "No context assigned"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4"/>
                                Time Context
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TaskTimeContextSelector task={task}/>
                        </CardContent>
                    </Card>

                </div>
            </DialogContent>
        </Dialog>
    )
}