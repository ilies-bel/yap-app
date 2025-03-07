"use client"
import useTasks from "@/services/api/task/taskService";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Status} from "@/services/api/status";


interface TaskListProps {
    filters?: { status: Status[] }
}

export function TaskList({filters}: TaskListProps) {
    const {data} = useTasks(filters)

    if (!data) {
        return <div>Loading...</div>
    }

    return (
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
                {data.map(task => (
                    <TableRow key={task.id}>
                        <TableCell>
                            {task.name}
                        </TableCell>
                        <TableCell className={"flex justify-end"}>
                            {task.status}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}