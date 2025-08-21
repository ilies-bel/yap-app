"use client"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Bot} from "lucide-react"
import {Chat} from "@/components/chat/chat"
import {useState} from "react"

export function ChatPopup() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    title="Open Chat Assistant"
                >
                    <Bot className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[600px] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        Chat Assistant
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <Chat />
                </div>
            </DialogContent>
        </Dialog>
    )
}