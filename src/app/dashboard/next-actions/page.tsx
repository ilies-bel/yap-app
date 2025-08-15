"use client"
import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {CurrentContexts} from "@/app/dashboard/currentContexts";
import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";

export default function NextActionsPage() {
    const {data: contexts} = useCurrentContexts();

    return (
        <div>
            <CurrentContexts/>

            <div className={"p-2"}>
                <NewTaskButton hideBody={false}/>
            </div>

            <TaskList 
                filters={{
                    status: [Status.TODO],
                    contextId: contexts?.deviceContext?.id
                }}
                hideStatusColumn={true}
            />
        </div>

    )
}