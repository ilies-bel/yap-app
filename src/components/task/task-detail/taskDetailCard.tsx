"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {StatusBadge} from "@/components/ui/status-badge"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CalendarIcon, FileTextIcon, MapPinIcon, Clock, Edit2, Save, X} from "lucide-react"
import {Status} from "@/services/api/status"
import {Difficulty} from "@/services/api/difficulty"
import {TaskTitle} from "@/components/task/task-title/taskTitle"
import {TaskContextDropdown} from "@/components/task/task-context/taskContextDropdown"
import {TaskTimeContextSelector} from "@/components/task/task-time-context/taskTimeContextSelector"
import {Task} from "@/services/api/task/taskService"
import {useUpdateTask} from "@/services/api/task/useUpdateTask"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {useState, useEffect} from "react"

interface TaskDetailCardProps {
    task: Task | null
    onClose: () => void
}

export function TaskDetailCard({task, onClose}: TaskDetailCardProps) {
    if (!task) return null

    const updateTask = useUpdateTask()
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const [editedDescription, setEditedDescription] = useState(task.description || "")

    // Update editedDescription when task changes
    useEffect(() => {
        setEditedDescription(task.description || "")
        setIsEditingDescription(false)
    }, [task.id, task.description])

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "No due date"
        return new Date(dateString).toLocaleDateString()
    }

    const handleSaveDescription = () => {
        updateTask.mutate({
            id: task.id,
            description: editedDescription || null
        }, {
            onSuccess: () => {
                setIsEditingDescription(false)
            }
        })
    }

    const handleCancelEdit = () => {
        setEditedDescription(task.description || "")
        setIsEditingDescription(false)
    }

    return (
        <Dialog open={!!task} onOpenChange={onClose}>
            <DialogContent className="max-w-[600px] w-full max-h-[80vh] overflow-y-auto">
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
                            <CardTitle className="text-sm font-medium flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FileTextIcon className="h-4 w-4"/>
                                    Description
                                </div>
                                {!isEditingDescription ? (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setIsEditingDescription(true)}
                                    >
                                        <Edit2 className="h-3 w-3"/>
                                    </Button>
                                ) : (
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-green-600"
                                            onClick={handleSaveDescription}
                                            disabled={updateTask.isPending}
                                        >
                                            <Save className="h-3 w-3"/>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-red-600"
                                            onClick={handleCancelEdit}
                                            disabled={updateTask.isPending}
                                        >
                                            <X className="h-3 w-3"/>
                                        </Button>
                                    </div>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isEditingDescription ? (
                                <Textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    placeholder="Enter task description..."
                                    className="min-h-[100px] resize-none"
                                    disabled={updateTask.isPending}
                                />
                            ) : (
                                <CardDescription className="text-sm whitespace-pre-wrap">
                                    {task.description || "No description provided"}
                                </CardDescription>
                            )}
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