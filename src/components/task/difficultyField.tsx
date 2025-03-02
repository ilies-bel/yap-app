import {UseFormReturn} from "react-hook-form";
import {FormType} from "@/components/task/newTaskFormSchema";
import {Label} from "@/components/ui/label";
import {FormField} from "@/components/ui/form";
import {DifficultySlider} from "@/components/task/difficultySlider";

export function DifficultyField({form}: { form: UseFormReturn<FormType> }) {
    return (
        <>
            <Label>Difficulty</Label>
            <FormField
                name={"difficultyScore"}
                control={form.control}
                render={
                    ({field}) => (
                        <DifficultySlider
                            className="w-full"
                            {...field}
                            value={field.value}
                            onValueChange={field.onChange}
                        />
                    )
                }>
            </FormField>
        </>

    );
}