import {Card, CardContent} from "@/components/ui/card";
import {useCurrentContexts} from "@/services/api/context/useCurrentContexts";


export function CurrentContexts() {
    const {data} = useCurrentContexts()

    return (
        <div className={"grid grid-cols-4 gap-2"}>
            <Card>
                <CardContent>
                    {data?.deviceContext?.name}
                </CardContent>
            </Card>
        </div>
    )
}