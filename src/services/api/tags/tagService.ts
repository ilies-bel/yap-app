import {z} from "zod";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {httpClient} from "@/services/api/apiClient";
import {createPageSchema} from "@/services/api/pageImpl";

// Tag schema
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

export type Tag = z.infer<typeof tagSchema>

// Request schemas
const createTagRequestSchema = z.object({
    name: z.string().min(1).max(50),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    description: z.string().max(500).optional()
})

export type CreateTagRequest = z.infer<typeof createTagRequestSchema>

const updateTagRequestSchema = z.object({
    name: z.string().min(1).max(50),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    description: z.string().max(500).optional()
})

export type UpdateTagRequest = z.infer<typeof updateTagRequestSchema>

const assignTagsRequestSchema = z.object({
    tagIds: z.array(z.number())
})

export type AssignTagsRequest = z.infer<typeof assignTagsRequestSchema>

const bulkTagOperationRequestSchema = z.object({
    taskIds: z.array(z.number()),
    addTagIds: z.array(z.number()).optional(),
    removeTagIds: z.array(z.number()).optional()
})

export type BulkTagOperationRequest = z.infer<typeof bulkTagOperationRequestSchema>

const bulkTagOperationResponseSchema = z.object({
    totalTasks: z.number(),
    modifiedTasks: z.number(),
    addedTags: z.array(tagSchema),
    removedTags: z.array(tagSchema)
})

export type BulkTagOperationResponse = z.infer<typeof bulkTagOperationResponseSchema>

// Tag page schema
const tagPageSchema = createPageSchema(tagSchema)

// Tag sort options
export type TagSortOption = 'name' | 'usage' | 'created'

// Tag filters
export interface TagFilters {
    search?: string
    archived?: boolean
    sort?: TagSortOption
    page?: number
    size?: number
}

// Custom hooks
export function useTags(filters: TagFilters = {}) {
    return useQuery({
        queryKey: ['tags', filters],
        queryFn: async () => {
            const params = {
                search: filters.search || '',
                archived: filters.archived || false,
                sort: filters.sort || 'name',
                page: filters.page || 0,
                size: filters.size || 20
            }
            const response = await httpClient.get('/tags', {params})
            return tagPageSchema.parse(response.data)
        }
    })
}

export function useTag(tagId: number) {
    return useQuery({
        queryKey: ['tag', tagId],
        queryFn: async () => {
            const response = await httpClient.get(`/tags/${tagId}`)
            return tagSchema.parse(response.data)
        },
        enabled: !!tagId
    })
}

export function usePopularTags(limit: number = 10) {
    return useQuery({
        queryKey: ['tags', 'popular', limit],
        queryFn: async () => {
            const response = await httpClient.get('/tags/popular', {
                params: {limit}
            })
            return z.array(tagSchema).parse(response.data)
        }
    })
}

export function useCreateTag() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (data: CreateTagRequest) => {
            const response = await httpClient.post('/tags', data)
            return tagSchema.parse(response.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
}

export function useUpdateTag() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({tagId, data}: {tagId: number, data: UpdateTagRequest}) => {
            const response = await httpClient.put(`/tags/${tagId}`, data)
            return tagSchema.parse(response.data)
        },
        onSuccess: (_, {tagId}) => {
            queryClient.invalidateQueries({queryKey: ['tags']})
            queryClient.invalidateQueries({queryKey: ['tag', tagId]})
        }
    })
}

export function useDeleteTag() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({tagId, removeFromTasks = true}: {tagId: number, removeFromTasks?: boolean}) => {
            await httpClient.delete(`/tags/${tagId}`, {
                params: {removeFromTasks}
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tags']})
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })
}

export function useArchiveTag() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (tagId: number) => {
            const response = await httpClient.put(`/tags/${tagId}/archive`)
            return tagSchema.parse(response.data)
        },
        onSuccess: (_, tagId) => {
            queryClient.invalidateQueries({queryKey: ['tags']})
            queryClient.invalidateQueries({queryKey: ['tag', tagId]})
        }
    })
}

export function useUnarchiveTag() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (tagId: number) => {
            const response = await httpClient.put(`/tags/${tagId}/unarchive`)
            return tagSchema.parse(response.data)
        },
        onSuccess: (_, tagId) => {
            queryClient.invalidateQueries({queryKey: ['tags']})
            queryClient.invalidateQueries({queryKey: ['tag', tagId]})
        }
    })
}

// Task-Tag operations
export function useTaskTags(taskId: number) {
    return useQuery({
        queryKey: ['task-tags', taskId],
        queryFn: async () => {
            const response = await httpClient.get(`/tags/tasks/${taskId}/tags`)
            return z.array(tagSchema).parse(response.data)
        },
        enabled: !!taskId
    })
}

export function useAssignTagsToTask() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({taskId, tagIds}: {taskId: number, tagIds: number[]}) => {
            const response = await httpClient.post(`/tags/tasks/${taskId}/tags`, {tagIds})
            return z.array(tagSchema).parse(response.data)
        },
        onSuccess: (_, {taskId}) => {
            queryClient.invalidateQueries({queryKey: ['task-tags', taskId]})
            queryClient.invalidateQueries({queryKey: ['tasks']})
            queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
}

export function useRemoveTagsFromTask() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({taskId, tagIds}: {taskId: number, tagIds: number[]}) => {
            const response = await httpClient.delete(`/tags/tasks/${taskId}/tags`, {data: {tagIds}})
            return z.array(tagSchema).parse(response.data)
        },
        onSuccess: (_, {taskId}) => {
            queryClient.invalidateQueries({queryKey: ['task-tags', taskId]})
            queryClient.invalidateQueries({queryKey: ['tasks']})
            queryClient.invalidateQueries({queryKey: ['tags']})
        }
    })
}

export function useBulkTagOperation() {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (data: BulkTagOperationRequest) => {
            const response = await httpClient.post('/tags/tasks/bulk/tags', data)
            return bulkTagOperationResponseSchema.parse(response.data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
            queryClient.invalidateQueries({queryKey: ['tags']})
            queryClient.invalidateQueries({queryKey: ['task-tags']})
        }
    })
}