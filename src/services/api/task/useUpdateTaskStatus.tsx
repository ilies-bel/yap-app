import {useMutation, useQueryClient} from "@tanstack/react-query"
import {httpClient} from "@/services/api/apiClient"
import {Status} from "@/services/api/status"

interface UpdateTaskStatusParams {
    taskId: number
    status: Status
}

export function useUpdateTaskStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({taskId, status}: UpdateTaskStatusParams) => {
            const response = await httpClient.patch(`/tasks/${taskId}`, {status})
            return response.data
        },
        onSuccess: () => {
            // Invalidate and refetch tasks query
            queryClient.invalidateQueries({queryKey: ['tasks']})
        },
    })
}