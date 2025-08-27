"use client"
import { useState } from "react"
import { useCurrentContexts } from "@/services/api/context/useCurrentContexts"
import { getDeviceIcon, getTimeIcon } from "@/components/context/contextIcon"
import { ContextSelector } from "@/components/context/ContextSelector"
import { Settings, Coffee, Building2, Monitor, Zap, Moon, Home, MapPin, Car, Phone, User, Target, Sparkles, MessageSquare } from "lucide-react"

interface CurrentContextsProps {
    selectedContexts: {
        energy: string | null
        location: string | null
        device: string | null
        mood: string | null
    }
    onContextChange: (category: string, value: string | null) => void
}

export function CurrentContexts({ selectedContexts, onContextChange }: CurrentContextsProps) {
    const { data } = useCurrentContexts()
    const [showContextSelector, setShowContextSelector] = useState(false)
    
    const getContextIcon = (contextValue: string) => {
        const icons: Record<string, JSX.Element> = {
            'high-energy': <Zap className="w-4 h-4" />,
            'medium-energy': <Coffee className="w-4 h-4" />,
            'low-energy': <Moon className="w-4 h-4" />,
            'office': <Building2 className="w-4 h-4" />,
            'home': <Home className="w-4 h-4" />,
            'anywhere': <MapPin className="w-4 h-4" />,
            'errands': <Car className="w-4 h-4" />,
            'computer': <Monitor className="w-4 h-4" />,
            'phone': <Phone className="w-4 h-4" />,
            'none': <User className="w-4 h-4" />,
            'focused': <Target className="w-4 h-4" />,
            'creative': <Sparkles className="w-4 h-4" />,
            'social': <MessageSquare className="w-4 h-4" />,
            'admin': <Settings className="w-4 h-4" />
        }
        return icons[contextValue] || <Settings className="w-4 h-4" />
    }
    
    const getContextLabel = (contextValue: string) => {
        const labels: Record<string, string> = {
            'high-energy': 'High Energy',
            'medium-energy': 'Medium Energy',
            'low-energy': 'Low Energy',
            'office': 'Office',
            'home': 'Home',
            'anywhere': 'Anywhere',
            'errands': 'Out & About',
            'computer': 'Computer',
            'phone': 'Phone Only',
            'none': 'No Device',
            'focused': 'Deep Focus',
            'creative': 'Creative',
            'social': 'Social',
            'admin': 'Admin'
        }
        return labels[contextValue] || contextValue
    }

    return (
        <div>
            {/* Current Context Bar */}
            <div className="bg-card border border-border rounded-lg px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-primary">Current Context:</span>
                        <div className="flex items-center gap-3">
                            {/* Energy Level */}
                            {selectedContexts.energy && (
                                <div className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full">
                                    {getContextIcon(selectedContexts.energy)}
                                    <span className="text-sm font-medium text-foreground">
                                        {getContextLabel(selectedContexts.energy)}
                                    </span>
                                </div>
                            )}
                            
                            {/* Location */}
                            {selectedContexts.location && (
                                <div className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full">
                                    {getContextIcon(selectedContexts.location)}
                                    <span className="text-sm font-medium text-foreground">
                                        {getContextLabel(selectedContexts.location)}
                                    </span>
                                </div>
                            )}
                            
                            {/* Device Context */}
                            {selectedContexts.device && (
                                <div className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full">
                                    {getContextIcon(selectedContexts.device)}
                                    <span className="text-sm font-medium text-foreground">
                                        {getContextLabel(selectedContexts.device)}
                                    </span>
                                </div>
                            )}
                            
                            {/* Mood/Mode */}
                            {selectedContexts.mood && (
                                <div className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full">
                                    {getContextIcon(selectedContexts.mood)}
                                    <span className="text-sm font-medium text-foreground">
                                        {getContextLabel(selectedContexts.mood)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowContextSelector(!showContextSelector)}
                        className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1.5 transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        Change Context
                    </button>
                </div>
            </div>
            
            {/* Context Selection Panel */}
            <ContextSelector 
                isOpen={showContextSelector} 
                onClose={() => setShowContextSelector(false)}
                selectedContexts={selectedContexts}
                onContextChange={onContextChange}
            />
        </div>
    )
}