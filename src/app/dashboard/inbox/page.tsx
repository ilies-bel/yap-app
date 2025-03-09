import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {NewTaskButton} from "@/components/task/new-task/newTaskButton";

export default function InboxPage() {

    return (
        <div>
            <div>
                <NewTaskButton hideBody={true}/>
            </div>
            <TaskList filters={{
                status: [Status.TO_REFINE],
            }}/>
            <TaskList filters={{
                status: [Status.SOMEDAY],
            }}/>
        </div>

    )
}