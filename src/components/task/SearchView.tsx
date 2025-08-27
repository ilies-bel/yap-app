"use client"
import { useState, useMemo, useCallback } from "react"
import { Task } from "@/services/api/task/taskService"
import { TaskCard } from "@/components/task/TaskCard"
import { TaskDetailCard } from "@/components/task/task-detail/taskDetailCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAllContexts } from "@/services/api/context/useAllContexts"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Status } from "@/services/api/status"
import useTasks from "@/services/api/task/taskService"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchViewProps {
    initialContextId?: number
}

export function SearchView({ initialContextId }: SearchViewProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedContextId, setSelectedContextId] = useState<number | undefined>(initialContextId)
    const [selectedStatus, setSelectedStatus] = useState<Status | undefined>(undefined)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    
    const { data: contexts } = useAllContexts()
    
    const filters = useMemo(() => ({
        contextId: selectedContextId,
        status: selectedStatus ? [selectedStatus] : undefined,
        size: 20
    }), [selectedContextId, selectedStatus])
    
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useTasks(filters)
    
    const tasks = useMemo(() => {
        return data?.pages.flatMap(page => page.content) ?? []
    }, [data])
    
    const filteredTasks = useMemo(() => {
        if (!searchTerm) return tasks
        
        const lowerSearch = searchTerm.toLowerCase()
        return tasks.filter(task => 
            task.name.toLowerCase().includes(lowerSearch) ||
            task.description?.toLowerCase().includes(lowerSearch) ||
            task.projectName?.toLowerCase().includes(lowerSearch) ||
            task.tags?.some(tag => tag.name.toLowerCase().includes(lowerSearch))
        )
    }, [tasks, searchTerm])
    
    const { ref: inViewRef } = useInView({
        threshold: 0,
        onChange: (inView) => {
            if (inView && hasNextPage && !isFetchingNextPage && !searchTerm) {
                fetchNextPage()
            }
        }
    })
    
    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
    }
    
    const handleCloseDetail = () => {
        setSelectedTask(null)
    }
    
    const clearFilters = () => {
        setSearchTerm("")
        setSelectedContextId(undefined)
        setSelectedStatus(undefined)
    }
    
    const hasActiveFilters = searchTerm || selectedContextId || selectedStatus
    
    return (
        <div>
            <div className="space-y-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search tasks by name, description, project, or tags..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                
                <div className="flex gap-3">
                    <Select
                        value={selectedContextId?.toString()}
                        onValueChange={(value) => setSelectedContextId(value === "all" ? undefined : Number(value))}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="All Contexts" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Contexts</SelectItem>
                            {contexts?.map(context => (
                                <SelectItem key={context.id} value={context.id.toString()}>
                                    {context.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    <Select
                        value={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value === "all" ? undefined : value as Status)}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value={Status.TO_REFINE}>To Refine</SelectItem>
                            <SelectItem value={Status.SOMEDAY}>Someday</SelectItem>
                            <SelectItem value={Status.TODO}>Todo</SelectItem>
                            <SelectItem value={Status.IN_PROGRESS}>In Progress</SelectItem>
                            <SelectItem value={Status.DONE}>Done</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                            Clear filters
                        </button>
                    )}
                </div>
                
                {hasActiveFilters && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Active filters:</span>
                        {searchTerm && (
                            <Badge variant="secondary">
                                Search: "{searchTerm}"
                            </Badge>
                        )}
                        {selectedContextId && contexts && (
                            <Badge variant="secondary">
                                Context: {contexts.find(c => c.id === selectedContextId)?.name}
                            </Badge>
                        )}
                        {selectedStatus && (
                            <Badge variant="secondary">
                                Status: {selectedStatus}
                            </Badge>
                        )}
                    </div>
                )}
            </div>
            
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-24 w-full" />
                    ))}
                </div>
            ) : filteredTasks.length > 0 ? (
                <>
                    <div className="space-y-3">
                        {filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onClick={handleTaskClick}
                            />
                        ))}
                    </div>
                    
                    {hasNextPage && !searchTerm && (
                        <div ref={inViewRef} className="flex justify-center mt-6 py-4">
                            {isFetchingNextPage ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                    <span className="text-sm text-gray-500">Loading more tasks...</span>
                                </div>
                            ) : (
                                <span className="text-sm text-gray-400">Loading trigger</span>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No tasks found matching your filters.</p>
                </div>
            )}
            
            <TaskDetailCard
                task={selectedTask}
                onClose={handleCloseDetail}
            />
        </div>
    )
}