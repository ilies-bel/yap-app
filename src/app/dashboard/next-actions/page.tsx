"use client"
import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {useQuery} from "@tanstack/react-query";
import {axiosClient} from "@/services/api/axiosInterceptor";

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
                <NewTaskButton hideBody={true}/>
            </div>
            <TaskList filters={{
                status: [Status.TODO],
            }}/>
        </div>

    )
}