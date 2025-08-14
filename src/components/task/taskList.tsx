"use client"
import useTasks, {Task} from "@/services/api/task/taskService";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Status} from "@/services/api/status";
import {RowsWithSkeleton} from "@/components/task/rowsWithSkeleton";
import {StatusBadge} from "@/components/ui/status-badge";
import {TaskDetailCard} from "@/components/task/task-detail/taskDetailCard";
import {useState} from "react";


interface TaskListProps {
    filters?: { status: Status[] }
}

export function TaskList({filters}: TaskListProps) {
    const {data} = useTasks(filters)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
    }

    const handleCloseDetail = () => {
        setSelectedTask(null)
    }


    return (
        <>
            <Table>
                <TableCaption>
                    Todo
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <RowsWithSkeleton loading={!data}>
                        {data?.map(task => (
                            <TableRow
                                key={task.id}
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => handleTaskClick(task)}
                            >
                                <TableCell className="max-w-0 truncate" style={{maxWidth: '300px'}}>
                                    <div className="truncate">
                                        {task.name}
                                    </div>
                                </TableCell>
                                <TableCell className={"flex justify-end"}>
                                    <StatusBadge status={task.status}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </RowsWithSkeleton>
                </TableBody>
            </Table>

            <TaskDetailCard
                task={selectedTask}
                onClose={handleCloseDetail}
            />
        </>
    )
}



