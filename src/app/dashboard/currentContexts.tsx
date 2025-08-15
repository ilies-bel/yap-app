import {Card, CardContent} from "@/components/ui/card";
import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";
import {getDeviceIcon, getTimeIcon} from "@/components/context/contextIcon";

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