import {cn} from "@/lib/utils";
import * as React from "react"
import {SingleValueSlider} from "@/components/ui/singleValueSlider";

type SliderProps = React.ComponentProps<typeof SingleValueSlider>


export function DifficultySlider({className, ...props}: SliderProps) {
    return (
        <SingleValueSlider
            max={100}
            step={20}
            className={cn("w-[60%]", className)}
            value={props.value}
            onValueChange={props.onValueChange}
            onCommitChange={props.onCommitChange}
        />
    )
}




