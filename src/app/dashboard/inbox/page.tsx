import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {Button} from "@/components/ui/button";

function ImportTaskButton() {
    return <Button>Import task</Button>
}

export default function InboxPage() {

    return (
        <div>
            <div className={"flex space-x-4"}>
                <NewTaskButton hideBody={true}/>
                <ImportTaskButton/>
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