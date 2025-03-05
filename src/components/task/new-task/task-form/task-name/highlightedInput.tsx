import React, {ReactElement} from 'react';
import {getFormattedText} from "@/components/task/new-task/task-form/task-name/getFormattedText";
import {EditableHtmlInput} from "@/components/task/new-task/task-form/task-name/editableHtmlInput";

interface UnderlinedWordsInputProps {
    wordsToUnderline: string[];
}

export function UnderlinedWordsInput({wordsToUnderline}: UnderlinedWordsInputProps): ReactElement {
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <div className="mb-6">
                <EditableHtmlInput
                    textTransformer={(text) => getFormattedText(text, wordsToUnderline)}/>
            </div>
        </div>
    );
}

export default UnderlinedWordsInput;