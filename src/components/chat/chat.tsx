"use client"
import BotAvatar from "@/components/chat/botAvatar";
import {BotChatBox} from "@/components/chat/botChatBox";
import {useState} from "react";


export function Chat() {
    const [isTyping, setIsTyping] = useState<boolean>(true);

    return (
        <div className={"grid grid-cols-12 gap-2 "}>
            <span className={"col-span-10"}>
                <BotChatBox setIsTyping={setIsTyping}/>
            </span>
            <span className="col-span-2 flex items-center justify-center h-20">
                <BotAvatar active={isTyping}/>
            </span>
        </div>
    )
}
