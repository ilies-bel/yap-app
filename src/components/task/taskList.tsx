import useTasks from "@/services/api/taskService";


export function TaskList() {
    const {data} = useTasks()

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        data.map(task => (
            <div key={task.id}>
                <h2>{task.name}</h2>
                <p>{task.description}</p>
                <p>{task.dueDate}</p>
                <p>{task.status}</p>
            </div>
        ))
    )
}