import {useMutation} from "@tanstack/react-query";
import {FormType} from "@/components/task/newTaskFormSchema";
import {api} from "@/services/api/axiosClient";

export const useCreateTask = (onSuccess: () => void) => {
    const {mutate} = useMutation({
        mutationKey: ['createTask'],
        mutationFn: (values: FormType) => {
            return api.post('/tasks', values);
        },
        onSuccess: onSuccess
    });

    return {
        createTask: (values: FormType) => mutate(values)
    };
}