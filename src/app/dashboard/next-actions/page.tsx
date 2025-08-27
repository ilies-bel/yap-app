"use client"
import { useMemo, useState } from "react"
import { Status } from "@/services/api/status"
import { CurrentContexts } from "@/app/dashboard/currentContexts"
import { useCurrentContexts } from "@/services/api/context/useCurrentContexts"
import useTasks, { Task } from "@/services/api/task/taskService"
import { useTaskSuggestions } from "@/services/api/task/useTaskSuggestions"
import { SuggestedTaskCard } from "@/components/task/SuggestedTaskCard"
import { TaskSection } from "@/components/task/TaskSection"
import { TaskCard } from "@/components/task/TaskCard"
import { TaskDetailCard } from "@/components/task/task-detail/taskDetailCard"
import { SearchView } from "@/components/task/SearchView"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Search } from "lucide-react"

export default function NextActionsPage() {
    const { data: contexts } = useCurrentContexts()
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [activeTab, setActiveTab] = useState("dashboard")
    
    // Local state for selected contexts (lifted from CurrentContexts)
    const [selectedContexts, setSelectedContexts] = useState({
        energy: 'medium-energy',
        location: 'home',
        device: 'computer',
        mood: null as string | null
    })
    
    // Handle context changes and trigger suggestion refetch
    const handleContextChange = (category: string, value: string | null) => {
        setSelectedContexts(prev => ({
            ...prev,
            [category]: value
        }))
    }
    
    // Get task suggestions based on current contexts
    const contextIds = contexts ? [
        contexts.deviceContext?.id,
        contexts.locationContext?.id,
        contexts.timeContext?.id
    ].filter(Boolean) as number[] : []
    
    const { data: suggestions, isLoading: suggestionsLoading } = useTaskSuggestions({
        contextIds,
        selectedContexts,
        enabled: activeTab === "dashboard"
    })
    
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useTasks({
        status: [Status.IN_PROGRESS, Status.TODO],
        contextId: contexts?.deviceContext?.id,
        size: 50
    })
    
    const tasks = useMemo(() => {
        return data?.pages.flatMap(page => page.content) ?? []
    }, [data])
    
    const tasksByStatus = useMemo(() => {
        const inProgress: Task[] = []
        const doToday: Task[] = []
        const upcoming: Task[] = []
        
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        tasks.forEach(task => {
            if (task.status === Status.IN_PROGRESS) {
                inProgress.push(task)
            } else if (task.dueDate) {
                const dueDate = new Date(task.dueDate)
                dueDate.setHours(0, 0, 0, 0)
                
                if (dueDate.getTime() <= today.getTime()) {
                    doToday.push(task)
                } else {
                    upcoming.push(task)
                }
            } else {
                upcoming.push(task)
            }
        })
        
        return { inProgress, doToday, upcoming }
    }, [tasks])
    
    const suggestedTask = useMemo(() => {
        return suggestions?.[0] || null
    }, [suggestions])
    
    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
    }
    
    const handleCloseDetail = () => {
        setSelectedTask(null)
    }
    
    return (
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="dashboard" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="search" className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search All Tasks
                    </TabsTrigger>
                </TabsList>
                
                <CurrentContexts 
                    selectedContexts={selectedContexts}
                    onContextChange={handleContextChange}
                />
                
                <TabsContent value="dashboard" className="mt-6">
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    ) : (
                        <div>
                            <SuggestedTaskCard 
                                task={suggestedTask?.task || null} 
                                matchScore={suggestedTask?.matchScore}
                            />
                            
                            <TaskSection
                                title="In Progress"
                                tasks={tasksByStatus.inProgress}
                                variant="default"
                                defaultExpanded={true}
                            >
                                {tasksByStatus.inProgress.length > 0 ? (
                                    tasksByStatus.inProgress.map(task => (
                                        <TaskCard 
                                            key={task.id} 
                                            task={task} 
                                            onClick={handleTaskClick}
                                        />
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">No tasks in progress</p>
                                )}
                            </TaskSection>
                            
                            {tasksByStatus.doToday.length > 0 && (
                                <TaskSection
                                    title="Do Today"
                                    tasks={tasksByStatus.doToday}
                                    variant="urgent"
                                    defaultExpanded={true}
                                >
                                    {tasksByStatus.doToday.map(task => (
                                        <TaskCard 
                                            key={task.id} 
                                            task={task} 
                                            onClick={handleTaskClick}
                                        />
                                    ))}
                                </TaskSection>
                            )}
                            
                            <TaskSection
                                title="Upcoming"
                                tasks={tasksByStatus.upcoming}
                                variant="upcoming"
                                defaultExpanded={false}
                            >
                                {tasksByStatus.upcoming.length > 0 ? (
                                    tasksByStatus.upcoming.map(task => (
                                        <TaskCard 
                                            key={task.id} 
                                            task={task} 
                                            onClick={handleTaskClick}
                                        />
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">No upcoming tasks</p>
                                )}
                            </TaskSection>
                            
                            {hasNextPage && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                        className="text-sm text-primary hover:underline disabled:opacity-50"
                                    >
                                        {isFetchingNextPage ? "Loading more..." : "Load more tasks"}
                                    </button>
                                </div>
                            )}
                            
                            <TaskDetailCard
                                task={selectedTask}
                                onClose={handleCloseDetail}
                            />
                        </div>
                    )}
                </TabsContent>
                
                <TabsContent value="search" className="mt-6">
                    <SearchView initialContextId={contexts?.deviceContext?.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}