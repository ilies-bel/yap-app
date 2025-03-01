import {z} from "zod";
import {useQuery} from "@tanstack/react-query";
import {api} from "@/services/api/axiosClient";


const tasks = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    dueDate: z.string(),
    status: z.string()
})

type Task = z.infer<typeof tasks>


export default function useTasks() {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async (): Promise<Task[]> => {
            const response = await api.get('/tasks')
            return z.array(tasks).parse(response.data)
        }
    })

}