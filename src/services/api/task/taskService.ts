import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";
import {Status, StatusSchema} from "@/services/api/status";
import {Difficulty, DifficultySchema} from "@/services/api/difficulty";
import {createPageSchema, PageImpl} from "@/services/api/pageImpl";


const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    status: StatusSchema,
    difficulty: DifficultySchema,
    context: z.string().nullable(),
    projectName: z.string().nullable(),
    dueDate: z.string().nullable()
})

export type Task = z.infer<typeof taskSchema>

const taskPageSchema = createPageSchema(taskSchema)


interface TaskPageFilter {
    status?: Status[]
    page?: number
    size?: number
}

export default function useTasks(filters?: TaskPageFilter) {
    return useQuery({
        queryKey: ['tasks', filters],
        queryFn: async (): Promise<PageImpl<Task>> => {
            const params = {
                status: filters?.status,
                page: filters?.page ?? 0,
                size: filters?.size ?? 20
            }
            const response = await axiosClient.get('/tasks', { params })
            return taskPageSchema.parse(response.data)
        },
        throwOnError: true,
    })
}