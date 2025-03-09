import {Alert, AlertDescription} from "@/components/ui/alert";
import {ChevronRight} from "lucide-react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import TypeEffect from "@/components/chat/TypingEffect";

const fetchMessage = async (): Promise<string> => {
    // Simulate API call with random delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    const messages = [
        "Hello! How can I help you today?",
        "I'm an AI assistant designed to answer your questions.",
        "Type your query and I'll do my best to assist you!",
        "Is there anything specific you'd like to know?",
        "I'm here to help with any information you need."
    ];

    return messages[Math.floor(Math.random() * messages.length)];
};

interface BotChatBoxProps {
    setIsTyping: Dispatch<SetStateAction<boolean>>
}

export function BotChatBox({setIsTyping}: BotChatBoxProps) {
    const [message, setMessage] = useState<string>('');

    // Fetch initial message
    useEffect(() => {
        fetchMessage().then(response => {
            setMessage(response);
        });
    }, []);


    return (
        <div>
            <Alert className={"h-full"}>
                <ChevronRight className="h-4 w-4"/>
                <AlertDescription className={"h-12"}>
                    <TypeEffect
                        text={message}
                        typingSpeed={15}
                        delay={200}
                        onComplete={() => setIsTyping(false)}
                    />
                </AlertDescription>
            </Alert>
        </div>

    )
}
