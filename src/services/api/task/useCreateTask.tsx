import {useMutation} from "@tanstack/react-query";
import {FormType} from "@/components/task/new-task/task-form/newTaskFormSchema";
import {httpClient} from "@/services/api/apiClient";


export const useCreateTask = (onSuccess: () => void) => {
    const {mutate} = useMutation({
        mutationKey: ['createTask'],
        mutationFn: (values: FormType) => {
            return httpClient.post('/tasks', values);
        },
        onSuccess: onSuccess
    });

    return {
        createTask: (values: FormType) => mutate(values)
    };
}