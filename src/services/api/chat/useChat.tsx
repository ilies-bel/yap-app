import {useQuery} from "@tanstack/react-query";
import {httpClient} from "@/services/api/apiClient";
import {z} from "zod";

export const chatSchema = z.object({
    id: z.number(),
    message: z.string(),
})

export function useChat() {
    return useQuery({
        queryKey: ['chats'],
        queryFn: async () => {
            const res = await httpClient.get("/chats/current")
            return chatSchema.parse(res.data)
        },
    })
}