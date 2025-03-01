import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function ProjectSelect() {
    const projects = [{
        name: 'YaP',
        id: 1
    }, {
        name: 'Démenagement',
        id: 2
    }
    ];

    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Project"/>
            </SelectTrigger>

            <SelectContent>
                {projects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>{project.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}