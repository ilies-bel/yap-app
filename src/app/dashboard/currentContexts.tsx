import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";
import {getDeviceIcon, getTimeIcon} from "@/components/context/contextIcon";

export function CurrentContexts() {
    const {data} = useCurrentContexts()

    return (
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-primary">Current Context:</span>
            
            {data?.timeContext && (
                <div className="flex items-center gap-1.5">
                    {getTimeIcon(data.timeContext.name)}
                    <span>{data.timeContext.name}</span>
                </div>
            )}
            
            <div className="flex items-center gap-1.5">
                <span>🏢</span>
                <span>Office</span>
            </div>
            
            {data?.deviceContext && (
                <div className="flex items-center gap-1.5">
                    {getDeviceIcon(data.deviceContext.type)}
                    <span>{data.deviceContext.name}</span>
                </div>
            )}
        </div>
    )
}