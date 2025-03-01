import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof Slider>


export function DifficultySlider({className, ...props}: SliderProps) {
    return (
        <Slider
            defaultValue={[50]}
            max={100}
            step={20}
            className={cn("w-[60%]", className)}
            {...props}
        />
    )
}