"use client"
import useTasks, {Task} from "@/services/api/task/taskService";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Status} from "@/services/api/status";
import {RowsWithSkeleton} from "@/components/task/rowsWithSkeleton";
import {StatusBadge} from "@/components/ui/status-badge";
import {TaskDetailCard} from "@/components/task/task-detail/taskDetailCard";
import {TaskStatusDropdown} from "@/components/task/task-status/taskStatusDropdown";
import {TaskTitle} from "@/components/task/task-title/taskTitle";
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
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <RowsWithSkeleton loading={!data}>
                        {data?.map(task => (
                            <TableRow
                                key={task.id}
                                className="cursor-pointer hover:bg-slate-50/30"
                                onClick={() => handleTaskClick(task)}
                            >
                                <TableCell className="w-12">
                                    <TaskStatusDropdown task={task} />
                                </TableCell>
                                <TableCell className="max-w-0" style={{maxWidth: '300px'}}>
                                    <TaskTitle title={task.name} />
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



