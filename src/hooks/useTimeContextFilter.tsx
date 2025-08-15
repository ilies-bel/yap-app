"use client"
import {useState, useEffect} from 'react';
import {useCurrentContexts} from '@/services/api/context/useCurrentContexts';

const STORAGE_KEY = 'selected-time-context';

type TimeContext = 'NIGHT' | 'MORNING' | 'AFTERNOON' | 'EVENING';

export function useTimeContextFilter() {
    const {data: contexts} = useCurrentContexts();
    const [selectedTimeContext, setSelectedTimeContext] = useState<TimeContext | null>(null);

    useEffect(() => {
        // Try to get saved time context from localStorage first
        const savedTimeContext = localStorage.getItem(STORAGE_KEY);
        
        if (savedTimeContext) {
            try {
                setSelectedTimeContext(savedTimeContext as TimeContext);
            } catch (error) {
                console.error('Failed to parse saved time context:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
        } else if (contexts?.timeContext?.name) {
            // Fall back to default time context from API
            const currentTimeContext = contexts.timeContext.name.toUpperCase() as TimeContext;
            setSelectedTimeContext(currentTimeContext);
        }
    }, [contexts?.timeContext]);

    const updateSelectedTimeContext = (timeContext: TimeContext | null) => {
        setSelectedTimeContext(timeContext);
        
        if (timeContext) {
            localStorage.setItem(STORAGE_KEY, timeContext);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return {
        selectedTimeContext,
        setSelectedTimeContext: updateSelectedTimeContext,
        currentTimeContext: contexts?.timeContext,
    };
}