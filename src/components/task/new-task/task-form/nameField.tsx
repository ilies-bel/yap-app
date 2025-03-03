import {UseFormReturn} from "react-hook-form";
import {FormType} from "@/components/task/new-task/task-form/newTaskFormSchema";
import {FormField} from "@/components/ui/form";
import {EditableHtmlInput} from "@/components/task/new-task/task-form/task-name/editableHtmlInput";
import {getFormattedText} from "@/components/task/new-task/task-form/task-name/getFormattedText";
import React from "react";

export function NameField({form}: { form: UseFormReturn<FormType> }) {
    return (
        <FormField
            name={"name"}
            control={form.control}
            render={
                ({field}) => (
                    <EditableHtmlInput
                        className={"border-0 focus-visible:border-0 focus-visible:ring-0"}

                        textTransformer={(text) => getFormattedText(text, ['react', 'component', 'underline', 'tmr', 'tomorrow', 'urgent'])}
                        inputProps={field}
                    />
                )
            }>
        </FormField>
    );
}


