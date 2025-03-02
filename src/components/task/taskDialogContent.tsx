"use client"

import {DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {FormProvider, useForm} from "react-hook-form";
import {Separator} from "@/components/ui/separator";
import {TaskDialogItem} from "@/components/task/taskDialogItem";
import {ProjectSelect} from "@/components/task/projectSelect";
import {Button} from "@/components/ui/button";
import {CommandShortcut} from "@/components/ui/command";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormType, newTaskFormSchema} from "@/components/task/newTaskFormSchema";
import {NameField} from "@/components/task/nameField";
import {DifficultyField} from "@/components/task/difficultyField";
import {useCreateTask} from "@/components/task/useCreateTask";

interface TaskDialogContentProps {
    closeDialog: () => void
}

export function TaskDialogContent({closeDialog}: TaskDialogContentProps) {

    const form = useForm<FormType>({
        resolver: zodResolver(newTaskFormSchema),
        defaultValues: {
            name: "",
            difficultyScore: 50,
        }
    });

    const {createTask} = useCreateTask(closeDialog);

    const onSubmit = async (values: FormType) => {
        createTask(values)
    };

    return (
        <DialogContent className="sm:max-w-[425px]" aria-describedby="task-dialog-description">
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


                        <div className="grid gap-4">
                            <TaskDialogItem>
                                <ProjectSelect/>
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


