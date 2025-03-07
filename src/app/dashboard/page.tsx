"use client"

import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {TaskList} from "@/components/task/taskList";
import UnderlinedWordsInput from "@/components/task/new-task/task-form/task-name/highlightedInput";
import {BoardMessage} from "@/app/dashboard/boardMessage";


export default function Page() {
    return (
        <>
            <div className={"flex flex-col space-y-4"}>
                <div>
                    <NewTaskButton/>
                    <BoardMessage/>
                </div>
                <div>
                    <UnderlinedWordsInput
                        wordsToUnderline={['tmr', 'tomorrow', 'urgent', '!!', '!!!']}/>
                </div>

                <TaskList/>
            </div>
        </>

    )
}