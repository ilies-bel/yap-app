import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";
import {z} from "zod";

const enum ContextType {
    LOCATION = 'LOCATION',
    TIME = 'TIME',
    DEVICE = 'DEVICE',
}

const timeContextSchema = z.object({
    name: z.string(),
    type: z.enum([ContextType.DEVICE, ContextType.LOCATION, ContextType.TIME]),
})

const contextSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.enum([ContextType.DEVICE, ContextType.LOCATION, ContextType.TIME]),
    deviceIdentifier: z.string(),
})

export type Context = z.infer<typeof contextSchema>

const contextsSchema = z.object({
    deviceContext: contextSchema.nullable(),
    timeContext: timeContextSchema.nullable(),
})


export function useCurrentContexts() {
    return useQuery({
        queryKey: ['contexts'],
        queryFn: async () => {
            const res = await axiosClient.get('/users/me/contexts')
            return contextsSchema.parse(res.data)
        },
    });
}