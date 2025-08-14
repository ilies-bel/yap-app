"use client"
import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/apiClient";

function useCurrentContext() {
    return useQuery({
        queryKey: ['contexts'],
        queryFn: async () => {
            return axiosClient.get('/contexts/current')
        }
    })
}

export default function NextActionsPage() {
    const {data} = useCurrentContext();

    return (
        <div>
            <div>
                <NewTaskButton hideBody={false}/>
            </div>
            <TaskList filters={{
                status: [Status.TODO],
            }}/>
        </div>

    )
}