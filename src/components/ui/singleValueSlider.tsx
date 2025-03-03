import * as React from "react";
import {Slider} from "@/components/ui/slider";


type SingleValueSliderProps = Omit<
    React.ComponentProps<typeof Slider>,
    "value" | "defaultValue" | "onValueChange" | "onValueCommit"
> & {
    value?: number
    defaultValue?: number
    onValueChange?: (value: number) => void
    onCommitChange?: (value: number) => void
}

const SingleValueSlider = React.forwardRef<
    React.ElementRef<typeof Slider>,
    SingleValueSliderProps
>(({value, defaultValue, onValueChange, onCommitChange, ...props}, ref) => {
    const sliderValue = value !== undefined ? [value] : undefined
    const sliderDefaultValue = defaultValue !== undefined ? [defaultValue] : undefined

    const handleValueChange = React.useCallback(
        (values: number[]) => {
            onValueChange?.(values[0])
        },
        [onValueChange]
    )

    const handleCommitChange = React.useCallback(
        (values: number[]) => {
            onCommitChange?.(values[0])
        },
        [onCommitChange]
    )

    return (
        <Slider
            ref={ref}
            value={sliderValue}
            defaultValue={sliderDefaultValue}
            onValueChange={handleValueChange}
            onValueCommit={handleCommitChange}
            {...props}
        />
    )
})

SingleValueSlider.displayName = "SingleValueSlider"
export {SingleValueSlider};