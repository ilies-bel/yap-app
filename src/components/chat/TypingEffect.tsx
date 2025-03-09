import {useEffect} from "react";
import {TypingEffectActions, useTypingEffect} from "@/components/chat/useTypingEffect";

type TypingEffectProps = {
    text: string;
    typingSpeed?: number;
    delay?: number;
    onComplete?: () => void;
}


function TypingEffect({text, typingSpeed = 50, delay = 500, onComplete}: TypingEffectProps) {

    const {state, reset, typeCharacter, stopTyping}: TypingEffectActions = useTypingEffect(text);

    useEffect(() => {
        reset();
    }, [reset, text]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (state.isTyping && state.currentIndex < text.length) {

            timeout = setTimeout(() => {
                typeCharacter(text[state.currentIndex]);
            }, state.currentIndex === 0 ? delay : typingSpeed);

        } else if (text && state.isTyping && state.currentIndex >= text.length) {
            stopTyping()
            if (onComplete) onComplete();
        }

        return () => clearTimeout(timeout);
    }, [text, typingSpeed, delay, onComplete, typeCharacter, stopTyping, state]);

    return (
        <div className="typing-effect">
            <p className="message">
                {state.displayedText}
                {state.isTyping && <span className="cursor">|</span>}
            </p>

            <style jsx>{`
                .typing-effect {
                    font-family: 'Inter', sans-serif;
                    line-height: 1.5;
                    overflow-wrap: break-word;
                }

                .message {
                    white-space: pre-wrap;
                    margin-bottom: 8px;
                }

                .cursor {
                    display: inline-block;
                    width: 2px;
                    animation: blink 1s infinite;
                    color: #666;
                    font-weight: bold;
                }

                @keyframes blink {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}

export default TypingEffect;