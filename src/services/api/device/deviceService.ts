import {z} from "zod"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {httpClient} from "@/services/api/apiClient"


const deviceSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    lastUsedAt: z.string().nullable(),
})

export type Device = z.infer<typeof deviceSchema>

export function useDevices() {
    return useQuery({
        queryKey: ['devices'],
        queryFn: async (): Promise<Device[]> => {
            const response = await httpClient.get('/users/current/devices')
            return z.array(deviceSchema).parse(response.data)
        },
    })
}

export function useAddDevice() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (deviceName: string) => {
            const response = await httpClient.post('/users/current/devices', {
                name: deviceName
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['devices']})
        },
    })
}

export function useDeleteDevice() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (deviceId: string) => {
            await httpClient.delete(`/users/current/devices/${deviceId}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['devices']})
        },
    })
}