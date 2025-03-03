import useTasks from "@/services/api/taskService";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";


export function TaskList() {
    const {data} = useTasks()

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