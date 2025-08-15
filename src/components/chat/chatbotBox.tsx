import {Alert, AlertDescription} from "@/components/ui/alert";
import {ChevronRight} from "lucide-react";
import {Dispatch, SetStateAction} from "react";
import TypeEffect from "@/components/chat/TypingEffect";
import {useChat} from "@/services/api/chat/useChat";


interface BotChatBoxProps {
    setIsTyping: Dispatch<SetStateAction<boolean>>
}

export function ChatbotBox({setIsTyping}: BotChatBoxProps) {

    const {data} = useChat();


    return (
        <Alert className={"h-full"}>
            <ChevronRight className="h-4 w-4"/>
            <AlertDescription className={"h-full"}>
                <TypeEffect
                    text={data?.message ?? ''}
                    typingSpeed={15}
                    delay={200}
                    onComplete={() => setIsTyping(false)}
                />
            </AlertDescription>
        </Alert>
    )
}
