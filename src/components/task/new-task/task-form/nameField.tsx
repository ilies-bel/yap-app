import {UseFormReturn} from "react-hook-form";
import {FormType} from "@/components/task/new-task/task-form/newTaskFormSchema";
import {FormField} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

export function NameField({form}: { form: UseFormReturn<FormType> }) {
    return (
        <FormField
            name={"name"}
            control={form.control}
            render={
                ({field}) => (
                    <Input
                        placeholder="What needs to be done?"
                        autoComplete="off"
                        className={"border-0 focus-visible:border-0 focus-visible:ring-0"}
                        {...field}
                    />
                )
            }>
        </FormField>
    );
}


