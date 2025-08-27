import { useQuery } from "@tanstack/react-query"
import { httpClient } from "@/services/api/apiClient"
import { z } from "zod"
import { Task } from "@/services/api/task/taskService"

const contextSchema = z.object({
    name: z.string(),
    type: z.enum(['LOCATION', 'TIME', 'DEVICE']),
})

const tagSchema = z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
    description: z.string().nullable().optional(),
    usageCount: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    isArchived: z.boolean()
})

const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    status: z.enum(['TO_REFINE', 'SOMEDAY', 'TODO', 'IN_PROGRESS', 'DONE']),
    difficulty: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    context: contextSchema.nullable(),
    projectName: z.string().nullable(),
    dueDate: z.string().nullable(),
    timeContext: z.enum(['NIGHT', 'MORNING', 'AFTERNOON', 'EVENING']).nullable().optional(),
    tags: z.array(tagSchema).optional().default([])
})

const taskSuggestionSchema = z.object({
    task: taskSchema,
    matchScore: z.number()
})

export type TaskSuggestion = z.infer<typeof taskSuggestionSchema>

const taskSuggestionsSchema = z.array(taskSuggestionSchema)

interface UseTaskSuggestionsParams {
    contextIds?: number[]
    selectedContexts?: {
        energy: string | null
        location: string | null
        device: string | null
        mood: string | null
    }
    enabled?: boolean
}

export function useTaskSuggestions({ contextIds = [], selectedContexts, enabled = true }: UseTaskSuggestionsParams = {}) {
    // Create a more specific query key that includes the context filters
    const contextFilters = selectedContexts ? Object.entries(selectedContexts)
        .filter(([_, value]) => value !== null)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) : {}
    
    return useQuery({
        queryKey: ['task-suggestions', 'context-filters', contextFilters, contextIds],
        queryFn: async (): Promise<TaskSuggestion[]> => {
            const response = await httpClient.post('/tasks/suggestions/best-matches', {
                contextIds,
                contextFilters
            })
            return taskSuggestionsSchema.parse(response.data)
        },
        enabled,
        staleTime: 5000, // Consider data stale after 5 seconds for more responsive context changes
        gcTime: 30000, // Keep in cache for 30 seconds
    })
}