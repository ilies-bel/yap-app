import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useFormContext} from "react-hook-form";
import {FormField} from "@/components/ui/form";

export function ProjectSelectField() {
    const {control} = useFormContext();

    const projects = [{
        name: 'YaP',
        id: 1
    }, {
        name: 'Démenagement',
        id: 2
    }
    ];

    return (
        <FormField
            control={control}
            name="project"
            render={({field}) => (
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Project"/>
                    </SelectTrigger>

                    <SelectContent>
                        {projects.map((project) => (
                            <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>)}>
        </FormField>

    )
}