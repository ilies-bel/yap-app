import {z} from "zod";

export const newTaskFormSchema = z.object({
    name: z.string().nonempty({message: "Task name is required"}),
    difficultyScore: z.number().int().min(0).max(100),
    project: z.string().nullish(),
    context: z.string().nullish(),
});

export type FormType = z.infer<typeof newTaskFormSchema>;
