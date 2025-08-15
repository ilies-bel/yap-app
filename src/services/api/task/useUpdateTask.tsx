import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";
import {Task} from "./taskService";

interface UpdateTaskParams {
    id: number;
    contextName?: string | null;
    status?: string;
    timeContext?: 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING' | null;
}

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (params: UpdateTaskParams): Promise<Task> => {
            const { id, ...updateData } = params;
            console.log('Sending update to backend:', updateData);
            const response = await axiosClient.patch(`/tasks/${id}`, updateData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}