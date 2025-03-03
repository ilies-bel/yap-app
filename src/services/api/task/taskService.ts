import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/axiosInterceptor";


const tasks = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    dueDate: z.string().nullable(),
    status: z.string().nullable(),
})

type Task = z.infer<typeof tasks>


export default function useTasks() {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async (): Promise<Task[]> => {
            const response = await axiosClient.get('/tasks')
            return z.array(tasks).parse(response.data)
        },
    })

}