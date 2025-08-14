"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, FileTextIcon } from "lucide-react"
import { Status } from "@/services/api/status"

interface Task {
  id: number
  name: string
  description: string | null
  dueDate: string | null
  status: Status
}

interface TaskDetailCardProps {
  task: Task | null
  onClose: () => void
}

export function TaskDetailCard({ task, onClose }: TaskDetailCardProps) {
  if (!task) return null

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No due date"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="truncate pr-4">{task.name}</span>
            <StatusBadge status={task.status} />
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileTextIcon className="h-4 w-4" />
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
                <CalendarIcon className="h-4 w-4" />
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
              <CardTitle className="text-sm font-medium">Task ID</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">#{task.id}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}