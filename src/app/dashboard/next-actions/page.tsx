"use client"
import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {CurrentContexts} from "@/app/dashboard/currentContexts";
import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";

export default function NextActionsPage() {
    const {data: contexts} = useCurrentContexts();

    return (
        <div>
            <CurrentContexts/>

            <TaskList 
                filters={{
                    status: [Status.IN_PROGRESS, Status.TODO],
                    contextId: contexts?.deviceContext?.id
                }}
                hideStatusColumn={true}
            />
        </div>

    )
}