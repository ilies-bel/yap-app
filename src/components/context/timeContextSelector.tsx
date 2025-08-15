"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {ChevronDown, Clock, Sun, Cloud, Moon} from "lucide-react"
import {getTimeIcon} from "@/components/context/contextIcon"
import React from "react";

interface TimeContextSelectorProps {
    selectedTimeContext: 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING' | null
    onTimeContextChange: (timeContext: 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING' | null) => void
}

type TimeContext = 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING';

const timeContexts: { value: TimeContext, label: string, icon: JSX.Element }[] = [
    { value: 'MORNING', label: 'Morning', icon: <Sun className="h-4 w-4" /> },
    { value: 'AFTERNOON', label: 'Afternoon', icon: <Cloud className="h-4 w-4" /> },
    { value: 'EVENING', label: 'Evening', icon: <Moon className="h-4 w-4" /> },
    { value: 'NIGHT', label: 'Night', icon: <Moon className="h-4 w-4 fill-current" /> },
];

const getTimeContextIcon = (timeContext: TimeContext | null) => {
    if (!timeContext) return <Clock className="h-4 w-4" />;
    const context = timeContexts.find(tc => tc.value === timeContext);
    return context?.icon || <Clock className="h-4 w-4" />;
}

const getTimeContextLabel = (timeContext: TimeContext | null) => {
    if (!timeContext) return 'All times';
    const context = timeContexts.find(tc => tc.value === timeContext);
    return context?.label || 'All times';
}

export function TimeContextSelector({selectedTimeContext, onTimeContextChange}: TimeContextSelectorProps) {

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div onClick={handleClick}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                        {getTimeContextIcon(selectedTimeContext)}
                        <span className="ml-2">{getTimeContextLabel(selectedTimeContext)}</span>
                        <ChevronDown className="ml-2 h-3 w-3"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem
                        onClick={() => onTimeContextChange(null)}
                        className={!selectedTimeContext ? "bg-accent" : ""}
                    >
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        All times
                    </DropdownMenuItem>
                    {timeContexts.map((tc) => (
                        <DropdownMenuItem
                            key={tc.value}
                            onClick={() => onTimeContextChange(tc.value)}
                            className={selectedTimeContext === tc.value ? "bg-accent" : ""}
                        >
                            <span className="mr-2">
                                {tc.icon}
                            </span>
                            {tc.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}