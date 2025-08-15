"use client"

import {NewTaskButton} from "@/components/task/new-task/newTaskButton";
import {TaskList} from "@/components/task/taskList";
import {CurrentContexts} from "@/app/dashboard/currentContexts";
import {DeviceContextSelector} from "@/components/context/deviceContextSelector";
import {TimeContextSelector} from "@/components/context/timeContextSelector";
import {useDeviceContextFilter} from "@/hooks/useDeviceContextFilter";
import {useTimeContextFilter} from "@/hooks/useTimeContextFilter";


export default function Page() {
    const {selectedDeviceContext, setSelectedDeviceContext} = useDeviceContextFilter();
    const {selectedTimeContext, setSelectedTimeContext} = useTimeContextFilter();

    return (
        <div className={"flex flex-col space-y-4"}>
            <div className="flex justify-between items-center">
                <NewTaskButton hideBody={false}/>
                <div className="flex gap-2">
                    <DeviceContextSelector 
                        selectedContext={selectedDeviceContext}
                        onContextChange={setSelectedDeviceContext}
                    />
                    <TimeContextSelector
                        selectedTimeContext={selectedTimeContext}
                        onTimeContextChange={setSelectedTimeContext}
                    />
                </div>
            </div>
            <CurrentContexts/>

            <TaskList filters={{
                contextId: selectedDeviceContext?.id,
                timeContext: selectedTimeContext || undefined
            }}/>
        </div>
    )
}

