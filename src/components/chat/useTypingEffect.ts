import {useEffect, useMemo, useState} from "react";

type TypingEffectState = {
    displayedText: string;
    isTyping: boolean;
    currentIndex: number;
};

export type TypingEffectActions = {
    reset: () => void;
    typeCharacter: (character: string) => void;
    stopTyping: () => void;
    state: TypingEffectState;
};

export function useTypingEffect(initialText: string) {
    const [state, setState] = useState<TypingEffectState>({
        displayedText: '',
        isTyping: false,
        currentIndex: 0
    });

    const reset = useMemo(() => () => {
        setState({
            displayedText: '',
            isTyping: true,
            currentIndex: 0
        });
    }, []);

    const typeCharacter = useMemo(() => (character: string) => {
        setState(prevState => ({
            ...prevState,
            displayedText: prevState.displayedText + character,
            currentIndex: prevState.currentIndex + 1
        }));
    }, []);


    const stopTyping = useMemo(() => () => {
        setState(prevState => ({
            ...prevState,
            isTyping: false
        }));
    }, []);

    useEffect(() => {
        reset();
    }, [initialText, reset]);

    return {state, reset, typeCharacter, stopTyping};
}