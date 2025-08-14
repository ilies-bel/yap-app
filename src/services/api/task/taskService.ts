import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";
import {Status, StatusSchema} from "@/services/api/status";


const tasks = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    dueDate: z.string().nullable(),
    status: StatusSchema
})

export type Task = z.infer<typeof tasks>


export default function useTasks(filters?: { status: Status[]; }) {
    return useQuery({
        queryKey: ['tasks', filters],
        queryFn: async (): Promise<Task[]> => {
            const response = await axiosClient.get('/tasks', {
                params: filters,
            })
            return z.array(tasks).parse(response.data)
        },
        throwOnError: true,
    })
}