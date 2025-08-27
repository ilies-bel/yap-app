"use client"
import { Task } from "@/services/api/task/taskService"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUpdateTaskStatus } from "@/services/api/task/useUpdateTaskStatus"
import { Status } from "@/services/api/status"
import { Play, Check, Monitor, Building2, Coffee, Tag } from "lucide-react"

interface SuggestedTaskCardProps {
    task: Task | null
    matchScore?: number
}

export function SuggestedTaskCard({ task, matchScore = 100 }: SuggestedTaskCardProps) {
    const { mutate: updateStatus } = useUpdateTaskStatus()
    
    if (!task) return null
    
    const handleStartNow = () => {
        updateStatus({
            taskId: task.id,
            status: Status.IN_PROGRESS
        })
    }
    
    const handleQuickComplete = () => {
        updateStatus({
            taskId: task.id,
            status: Status.DONE
        })
    }
    
    const getContextIcon = (contextType: string) => {
        switch (contextType) {
            case 'DEVICE':
                return <Monitor className="h-4 w-4" />
            case 'LOCATION':
                return <Building2 className="h-4 w-4" />
            case 'TIME':
                return <Coffee className="h-4 w-4" />
            default:
                return null
        }
    }
    
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <h2 className="text-sm font-semibold uppercase text-muted-foreground">
                    Best Match for Current Context
                </h2>
            </div>
            
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{task.name}</h3>
                            {task.projectName && (
                                <p className="text-sm text-muted-foreground">{task.projectName}</p>
                            )}
                        </div>
                        <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                            {matchScore}% match
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                        {task.context && (
                            <Badge variant="secondary" className="gap-1.5 bg-green-50 text-green-700 border-0">
                                {getContextIcon(task.context.type)}
                                {task.context.name}
                            </Badge>
                        )}
                        {task.timeContext && (
                            <Badge variant="secondary" className="gap-1.5 bg-blue-50 text-blue-700 border-0">
                                <Coffee className="h-4 w-4" />
                                {task.timeContext.toLowerCase()}
                            </Badge>
                        )}
                        {task.difficulty && (
                            <Badge variant="secondary" className="gap-1.5 bg-purple-50 text-purple-700 border-0">
                                <Coffee className="h-4 w-4" />
                                {task.difficulty.toLowerCase()}-energy
                            </Badge>
                        )}
                        {task.tags && task.tags.length > 0 && (
                            <Badge variant="secondary" className="gap-1.5 bg-gray-50 text-gray-700 border-0">
                                <Tag className="h-4 w-4" />
                                {task.tags[0].name}
                            </Badge>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Button 
                            onClick={handleStartNow}
                            className="flex-1 gap-2"
                            size="lg"
                            disabled={task.status === Status.IN_PROGRESS}
                        >
                            <Play className="h-4 w-4" />
                            {task.status === Status.IN_PROGRESS ? "Already In Progress" : "Start Now"}
                        </Button>
                        <Button 
                            onClick={handleQuickComplete}
                            size="lg"
                            className="px-4 bg-green-600 hover:bg-green-700 text-white"
                        >
                            <Check className="h-5 w-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}