"use client"
import {Dialog, DialogTrigger} from "../../ui/dialog";
import {Button} from "@/components/ui/button";
import {TaskDialogContent} from "@/components/task/new-task/taskDialogContent";
import {useState} from "react";
import {useShortcuts} from "@/lib/useShortcuts";


export function NewTaskButton({hideBody}: { hideBody: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    useShortcuts("t", () => {
        setIsOpen(true);
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>New task</Button>
            </DialogTrigger>
            <TaskDialogContent closeDialog={() => setIsOpen(false)} hideBody={hideBody}/>
        </Dialog>
    )
}