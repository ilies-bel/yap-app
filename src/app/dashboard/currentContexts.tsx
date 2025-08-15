import {Card, CardContent} from "@/components/ui/card";
import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";
import {Smartphone, Monitor, Tablet, HardDrive, Clock, Sun, Cloud, Moon} from "lucide-react";


const getDeviceIcon = (deviceType: string) => {
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

const getTimeIcon = (timeName: string) => {
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

export function CurrentContexts() {
    const {data} = useCurrentContexts()

    return (
        <div className={"grid grid-cols-4 gap-2"}>
            <Card>
                <CardContent className="flex items-center justify-center gap-2 p-3">
                    {data?.deviceContext && getDeviceIcon(data.deviceContext.type)}
                    <span className="text-sm">{data?.deviceContext?.name}</span>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex items-center justify-center gap-2 p-3">
                    {data?.timeContext && getTimeIcon(data.timeContext.name)}
                    <span className="text-sm">{data?.timeContext?.name}</span>
                </CardContent>
            </Card>
        </div>
    )
}