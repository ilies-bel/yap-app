"use client"

import {DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {FormProvider, useForm} from "react-hook-form";
import {Separator} from "@/components/ui/separator";
import {TaskDialogItem} from "@/components/task/new-task/taskDialogItem";
import {ProjectSelectField} from "@/components/task/new-task/task-form/projectSelectField";
import {Button} from "@/components/ui/button";
import {CommandShortcut} from "@/components/ui/command";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormType, newTaskFormSchema} from "@/components/task/new-task/task-form/newTaskFormSchema";
import {NameField} from "@/components/task/new-task/task-form/nameField";
import {DifficultyField} from "@/components/task/new-task/task-form/difficulty/difficultyField";

import {useCreateTask} from "@/services/api/task/useCreateTask";

interface TaskDialogContentProps {
    closeDialog: () => void
    hideBody: boolean
}

export function TaskDialogContent({closeDialog, hideBody}: TaskDialogContentProps) {

    const form = useForm<FormType>({
        resolver: zodResolver(newTaskFormSchema),
        defaultValues: {
            name: "",
            difficultyScore: 50,
        }
    });

    const {createTask} = useCreateTask(closeDialog);
    
    const difficultyScore = form.watch('difficultyScore') || 50;
    
    // Calculate red intensity based on difficulty (0-100 -> 0-255)
    const redIntensity = Math.round((difficultyScore / 100) * 255);
    const borderColor = `rgb(${redIntensity}, ${Math.max(0, 255 - redIntensity)}, ${Math.max(0, 255 - redIntensity)})`;

    const onSubmit = async (values: FormType) => {
        createTask(values)
    };

    return (
        <DialogContent 
            className="sm:max-w-[425px]" 
            aria-describedby="task-dialog-description"
            style={{ borderColor, borderWidth: '2px' }}
        >
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={"space-y-4"}>
                        <DialogTitle hidden>
                            Add a new task
                        </DialogTitle>

                        <DialogTitle>
                            <NameField form={form}/>
                        </DialogTitle>

                        <Separator/>

                        <div className="grid gap-4" hidden={hideBody}>
                            <TaskDialogItem>
                                <ProjectSelectField/>
                            </TaskDialogItem>

                            <TaskDialogItem>
                                <DifficultyField form={form}/>
                            </TaskDialogItem>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save changes <CommandShortcut>⌘ + ⏎</CommandShortcut></Button>
                        </DialogFooter>
                    </div>
                </form>
            </FormProvider>
        </DialogContent>
    );
}


