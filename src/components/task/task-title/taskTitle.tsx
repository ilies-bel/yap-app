"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

interface TaskTitleProps {
    title: string
    className?: string
    showFullOnHover?: boolean
}

export function TaskTitle({title, className = "", showFullOnHover = true}: TaskTitleProps) {
    const content = (
        <div className={`truncate ${className}`}>
            {title}
        </div>
    )

    if (!showFullOnHover) {
        return content
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {content}
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs break-words">{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}