import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/axiosInterceptor";
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

const contextsSchema = z.object({
    deviceContext: contextSchema.nullable(),
})

export type Contexts = z.infer<typeof contextsSchema>

export function useCurrentContexts() {
    return useQuery({
        queryKey: ['contexts'],
        queryFn: async () => {
            const res = await axiosClient.get('/contexts/current')
            return contextsSchema.parse(res.data)
        },
    });
}