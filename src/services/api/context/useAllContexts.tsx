import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";
import {z} from "zod";

const enum ContextType {
    LOCATION = 'LOCATION',
    TIME = 'TIME',
    DEVICE = 'DEVICE',
}

const contextSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.enum([ContextType.DEVICE, ContextType.LOCATION, ContextType.TIME]),
    deviceIdentifier: z.string(),
})

export type Context = z.infer<typeof contextSchema>

const contextsListSchema = z.array(contextSchema)

export function useAllContexts() {
    return useQuery({
        queryKey: ['contexts', 'all'],
        queryFn: async () => {
            const res = await axiosClient.get('/contexts')
            return contextsListSchema.parse(res.data)
        },
    });
}