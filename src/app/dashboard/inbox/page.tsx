'use client'

import {TaskList} from "@/components/task/taskList";
import {Status} from "@/services/api/status"
import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {Button} from "@/components/ui/button";
import {Sparkles} from "lucide-react";
import {useRouter} from "next/navigation";

function ImportTaskButton() {
    return <Button>Import task</Button>
}

export default function InboxPage() {
    const router = useRouter();

    return (
        <div>
            <div className={"flex space-x-4"}>
                <NewTaskButton hideBody={true}/>
                <ImportTaskButton/>
                <Button 
                    onClick={() => router.push('/dashboard/refine')}
                    variant="outline"
                    className="flex items-center gap-2"
                >
                    <Sparkles className="h-4 w-4" />
                    Refine Tasks
                </Button>
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