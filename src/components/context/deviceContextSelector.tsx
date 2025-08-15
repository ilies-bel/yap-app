"use client"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {ChevronDown, Filter} from "lucide-react"
import {useAllContexts} from "@/services/api/context/useAllContexts"
import {getDeviceIcon} from "@/components/context/contextIcon"
import {Context} from "@/services/api/context/useCurrentContexts"
import React from "react";

interface DeviceContextSelectorProps {
    selectedContext: Context | null
    onContextChange: (context: Context | null) => void
}

export function DeviceContextSelector({selectedContext, onContextChange}: DeviceContextSelectorProps) {
    const {data: contexts = []} = useAllContexts()
    
    // Filter only device contexts
    const deviceContexts = contexts.filter(ctx => ctx.type === 'DEVICE')

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div onClick={handleClick}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 px-3 text-sm">
                        <Filter className="h-4 w-4 mr-2" />
                        {selectedContext ? (
                            <>
                                {getDeviceIcon(selectedContext.name)}
                                <span className="ml-2">{selectedContext.name}</span>
                            </>
                        ) : (
                            'All devices'
                        )}
                        <ChevronDown className="ml-2 h-3 w-3"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem
                        onClick={() => onContextChange(null)}
                        className={!selectedContext ? "bg-accent" : ""}
                    >
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        All devices
                    </DropdownMenuItem>
                    {deviceContexts.map((context) => (
                        <DropdownMenuItem
                            key={context.id}
                            onClick={() => onContextChange(context)}
                            className={selectedContext?.id === context.id ? "bg-accent" : ""}
                        >
                            <span className="mr-2">
                                {getDeviceIcon(context.name)}
                            </span>
                            {context.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}