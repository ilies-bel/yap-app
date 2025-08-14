import {z} from "zod";
import {useInfiniteQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";
import {Status, StatusSchema} from "@/services/api/status";
import {DifficultySchema} from "@/services/api/difficulty";
import {createPageSchema, PageImpl} from "@/services/api/pageImpl";


const contextSchema = z.object({
    name: z.string(),
    type: z.enum(['LOCATION', 'TIME', 'DEVICE']),
})

const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    status: StatusSchema,
    difficulty: DifficultySchema,
    context: contextSchema.nullable(),
    projectName: z.string().nullable(),
    dueDate: z.string().nullable()
})

export type Task = z.infer<typeof taskSchema>

const taskPageSchema = createPageSchema(taskSchema)


interface TaskPageFilter {
    status?: Status[]
    size?: number
    contextId?: number
}

export default function useTasks(filters?: TaskPageFilter) {
    return useInfiniteQuery({
        queryKey: ['tasks', filters],
        queryFn: async ({pageParam = 0}): Promise<PageImpl<Task>> => {
            const params = {
                status: filters?.status,
                page: pageParam,
                size: filters?.size ?? 20,
                contextId: filters?.contextId
            }
            const response = await axiosClient.get('/tasks', {params})
            return taskPageSchema.parse(response.data)
        },
        getNextPageParam: (lastPage) => {
            const {page} = lastPage
            const hasNextPage = page.number + 1 < page.totalPages
            return hasNextPage ? page.number + 1 : undefined
        },
        initialPageParam: 0,
    })
}