"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Settings, Zap, Coffee, Moon, Building2, Home, MapPin, Car, Monitor, Phone, User, Target, Sparkles, MessageSquare } from "lucide-react"
import { useAllContexts } from "@/services/api/context/useAllContexts"
import { useCurrentContexts } from "@/services/api/context/useCurrentContexts"

interface ContextSelectorProps {
    isOpen: boolean
    onClose: () => void
    selectedContexts: {
        energy: string | null
        location: string | null
        device: string | null
        mood: string | null
    }
    onContextChange: (category: string, value: string | null) => void
}

export function ContextSelector({ isOpen, onClose, selectedContexts, onContextChange }: ContextSelectorProps) {
    const { data: allContexts } = useAllContexts()
    const { data: currentContexts } = useCurrentContexts()
    
    const handleContextClick = (category: string, value: string) => {
        // Toggle context - if already selected, deselect it
        const currentValue = selectedContexts[category as keyof typeof selectedContexts]
        onContextChange(category, currentValue === value ? null : value)
    }
    
    const handleClearAll = () => {
        onContextChange('energy', null)
        onContextChange('location', null)
        onContextChange('device', null)
        onContextChange('mood', null)
    }
    
    // Mock context categories for now - these would come from your API
    const contextCategories = {
        energy: {
            label: 'Energy Level',
            icon: <Zap className="w-4 h-4" />,
            options: [
                { value: 'high-energy', label: 'High Energy', icon: <Zap className="w-4 h-4" /> },
                { value: 'medium-energy', label: 'Medium Energy', icon: <Coffee className="w-4 h-4" /> },
                { value: 'low-energy', label: 'Low Energy', icon: <Moon className="w-4 h-4" /> }
            ]
        },
        location: {
            label: 'Location',
            icon: <MapPin className="w-4 h-4" />,
            options: [
                { value: 'office', label: 'Office', icon: <Building2 className="w-4 h-4" /> },
                { value: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
                { value: 'anywhere', label: 'Anywhere', icon: <MapPin className="w-4 h-4" /> },
                { value: 'errands', label: 'Out & About', icon: <Car className="w-4 h-4" /> }
            ]
        },
        device: {
            label: 'Device Available',
            icon: <Monitor className="w-4 h-4" />,
            options: [
                { value: 'computer', label: 'Computer', icon: <Monitor className="w-4 h-4" /> },
                { value: 'phone', label: 'Phone Only', icon: <Phone className="w-4 h-4" /> },
                { value: 'none', label: 'No Device', icon: <User className="w-4 h-4" /> }
            ]
        },
        mood: {
            label: 'Mood/Mode',
            icon: <Target className="w-4 h-4" />,
            options: [
                { value: 'focused', label: 'Deep Focus', icon: <Target className="w-4 h-4" /> },
                { value: 'creative', label: 'Creative', icon: <Sparkles className="w-4 h-4" /> },
                { value: 'social', label: 'Social', icon: <MessageSquare className="w-4 h-4" /> },
                { value: 'admin', label: 'Admin', icon: <Settings className="w-4 h-4" /> }
            ]
        }
    }

    if (!isOpen) return null

    return (
        <div className="bg-card border-b border-border px-4 py-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">Set Your Current Context</h3>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(contextCategories).map(([category, config]) => (
                        <div key={category}>
                            <div className="flex items-center gap-1 mb-2">
                                {config.icon}
                                <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
                            </div>
                            <div className="space-y-1">
                                {config.options.map(option => {
                                    const isSelected = selectedContexts[category as keyof typeof selectedContexts] === option.value
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => handleContextClick(category, option.value)}
                                            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors font-medium ${
                                                isSelected 
                                                    ? 'bg-primary/20 text-primary' 
                                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                            }`}
                                        >
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                        Tasks will be re-ranked based on your current context
                    </p>
                    <button 
                        onClick={handleClearAll}
                        className="text-xs text-muted-foreground hover:text-foreground"
                    >
                        Clear All
                    </button>
                </div>
            </div>
        </div>
    )
}