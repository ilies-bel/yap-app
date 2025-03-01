"use client"

import {NewTaskButton} from "@/components/task/newTaskButton";
import {TaskList} from "@/components/task/taskList";

export default function Page() {
    return (
        <div>
            <NewTaskButton/>
            <TaskList/>
        </div>
    )
}