import {useEffect, useState} from "react";
import {TypingEffectActions, useTypingEffect} from "@/components/chat/useTypingEffect";
import Markdown from 'react-markdown'

type TypingEffectProps = {
    text: string;
    typingSpeed?: number;
    delay?: number;
    onComplete?: () => void;
}


function TypingEffect({text, typingSpeed = 50, delay = 500, onComplete}: TypingEffectProps) {

    const {state, reset, typeCharacter, stopTyping}: TypingEffectActions = useTypingEffect(text);
    const [hasCompletedTyping, setHasCompletedTyping] = useState(false);

    // Check if this message was already completed
    useEffect(() => {
        const completedKey = `typing-completed-${text}`;
        const wasCompleted = localStorage.getItem(completedKey) === 'true';
        
        if (wasCompleted) {
            setHasCompletedTyping(true);
            // Skip typing animation, show full text immediately
            reset();
            stopTyping();
            if (onComplete) onComplete();
        } else {
            setHasCompletedTyping(false);
            reset();
        }
    }, [reset, text, stopTyping, onComplete]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        // Skip animation if already completed
        if (hasCompletedTyping) return;

        if (state.isTyping && state.currentIndex < text.length) {

            timeout = setTimeout(() => {
                typeCharacter(text[state.currentIndex]);
            }, state.currentIndex === 0 ? delay : typingSpeed);

        } else if (text && state.isTyping && state.currentIndex >= text.length) {
            stopTyping()
            // Mark as completed in localStorage
            const completedKey = `typing-completed-${text}`;
            localStorage.setItem(completedKey, 'true');
            setHasCompletedTyping(true);
            if (onComplete) onComplete();
        }

        return () => clearTimeout(timeout);
    }, [text, typingSpeed, delay, onComplete, typeCharacter, stopTyping, state, hasCompletedTyping]);

    return (
        <div className="typing-effect">
            <p className="message flex">
                <Markdown>{hasCompletedTyping ? text : state.displayedText}</Markdown>
                {state.isTyping && !hasCompletedTyping && <span className="cursor">|</span>}
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