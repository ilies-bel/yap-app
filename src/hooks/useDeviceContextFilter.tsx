"use client"
import {useState, useEffect} from 'react';
import {useCurrentContexts} from '@/services/api/context/useCurrentContexts';
import {Context} from '@/services/api/context/useCurrentContexts';

const STORAGE_KEY = 'selected-device-context';

export function useDeviceContextFilter() {
    const {data: contexts} = useCurrentContexts();
    const [selectedDeviceContext, setSelectedDeviceContext] = useState<Context | null>(null);

    useEffect(() => {
        // Try to get saved context from localStorage first
        const savedContext = localStorage.getItem(STORAGE_KEY);
        
        if (savedContext) {
            try {
                const parsedContext = JSON.parse(savedContext);
                setSelectedDeviceContext(parsedContext);
            } catch (error) {
                console.error('Failed to parse saved context:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
        } else if (contexts?.deviceContext) {
            // Fall back to default context from API
            setSelectedDeviceContext(contexts.deviceContext);
        }
    }, [contexts?.deviceContext]);

    const updateSelectedContext = (context: Context | null) => {
        setSelectedDeviceContext(context);
        
        if (context) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(context));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return {
        selectedDeviceContext,
        setSelectedDeviceContext: updateSelectedContext,
        availableContexts: contexts,
    };
}