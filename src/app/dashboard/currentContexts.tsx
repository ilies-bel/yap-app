import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";


export function CurrentContexts() {
    const {data} = useCurrentContexts()

    return (
        <div className={"grid grid-cols-3 gap-2"}>
            <Card>
                <CardHeader>
                    Device
                </CardHeader>
                <CardContent>
                    <div>
                        {data?.deviceContext?.name}
                    </div>
                    <div>
                        {data?.deviceContext?.deviceIdentifier}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}