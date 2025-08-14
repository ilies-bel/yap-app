import React, {ChangeEvent, ReactElement, useState} from "react";

export function EditableHtmlInput({textTransformer, inputProps}: {
    textTransformer: (text: string) => string,
    inputProps?: React.ComponentProps<"input">
}): ReactElement {


    const [text, setText] = useState<string | undefined>(inputProps?.value?.toString());

    // Handle text changes and cursor position
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const newText = e.target.value;
        setText(newText);
    };

    return (
        <div className="relative" style={{height: '30px', maxWidth: '300px'}}>
            <input
                {...inputProps}
                spellCheck={"false"}
                type="text"
                value={text}
                onChange={(e) => {
                    handleTextChange(e)
                    inputProps?.onChange?.(e)
                }}

                className="absolute inset-0 w-full h-full p-2 " // border-0 focus-visible:border-0 focus-visible:ring-0
                autoCorrect={"off"}
                style={{
                    color: 'transparent',
                    caretColor: '#00ADB5',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    zIndex: 2,
                    font: 'inherit'
                }}
            />

            <div
                className="absolute inset-0 w-full h-full p-2 border-0 focus-visible:border-0 focus-visible:ring-0 overflow-hidden "
                style={{
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    pointerEvents: 'auto'
                }}
                dangerouslySetInnerHTML={{__html: textTransformer(text)}}
            />
        </div>
    )
}