"use client"

import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {TaskList} from "@/components/task/taskList";
import {CurrentContexts} from "@/app/dashboard/currentContexts";


export default function Page() {
    return (
        <div className={"flex flex-col space-y-4"}>
            <div>
                <NewTaskButton hideBody={false}/>
            </div>
            <CurrentContexts/>

            <TaskList/>
        </div>
    )
}

