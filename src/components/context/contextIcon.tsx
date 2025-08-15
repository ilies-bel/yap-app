import {Smartphone, Monitor, Tablet, HardDrive, Clock, Sun, Cloud, Moon, MapPin} from "lucide-react";

export const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
        case 'mobile':
            return <Smartphone className="h-4 w-4" />
        case 'desktop':
            return <Monitor className="h-4 w-4" />
        case 'tablet':
            return <Tablet className="h-4 w-4" />
        default:
            return <HardDrive className="h-4 w-4" />
    }
}

export const getTimeIcon = (timeName: string) => {
    switch (timeName?.toLowerCase()) {
        case 'morning':
            return <Sun className="h-4 w-4" />
        case 'afternoon':
            return <Cloud className="h-4 w-4" />
        case 'evening':
            return <Moon className="h-4 w-4" />
        case 'night':
            return <Moon className="h-4 w-4" />
        default:
            return <Clock className="h-4 w-4" />
    }
}

export const getLocationIcon = () => {
    return <MapPin className="h-4 w-4" />
}

interface ContextIconProps {
    context: {
        name: string;
        type: 'DEVICE' | 'TIME' | 'LOCATION';
    } | null;
}

export function ContextIcon({ context }: ContextIconProps) {
    if (!context) return null;
    
    switch (context.type) {
        case 'DEVICE':
            return getDeviceIcon(context.name);
        case 'TIME':
            return getTimeIcon(context.name);
        case 'LOCATION':
            return getLocationIcon();
        default:
            return null;
    }
}