import {useCallback, useEffect} from "react";

export const useShortcuts = (shortCutKey: string, onShortcut: () => void) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const target = event.target as HTMLElement;

        const isTypingInField =
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            target.tagName === 'SELECT';

        if (event.key === shortCutKey && !isTypingInField) {
            onShortcut();
            event.preventDefault();
        }

    }, [shortCutKey, onShortcut]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown, onShortcut]);
}