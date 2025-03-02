import {Dialog, DialogTrigger} from "../ui/dialog";
import {Button} from "@/components/ui/button";
import {TaskDialogContent} from "@/components/task/taskDialogContent";
import {useState} from "react";
import {useShortcuts} from "@/lib/useShortcuts";


export function NewTaskButton() {
    const [isOpen, setIsOpen] = useState(false);

    useShortcuts("t", () => {
        setIsOpen(true);
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">New task</Button>
            </DialogTrigger>
            <TaskDialogContent closeDialog={() => setIsOpen(false)}/>
        </Dialog>
    )
}