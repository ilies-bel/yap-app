"use client"
import React, {useEffect, useState} from 'react';

export function BotAvatar({active}: { active: boolean }) {
    // Visual state tracks the visual appearance and allows for delayed transitions
    const [visualState, setVisualState] = useState(active);

    useEffect(() => {
        // When active becomes true, update visual state immediately
        if (active) {
            setVisualState(true);
        }
        // When active becomes false, delay the visual change to allow for transition
        else {
            // Keep the current visual state for 100ms to let the animation start
            const timeout = setTimeout(() => {
                setVisualState(false);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [active]);

    return (
        <span className="relative w-16 h-16">
            <div
                className={`
                w-16 h-16 absolute inset-0 rounded-full 
                flex items-center justify-center border-4
              `}
            >
                <div
                    className={`
                    w-8 h-8 rounded-full 
                    flex items-center justify-center border-2
                    transition-all duration-1000 ease-in-out
                    ${visualState
                        ? 'border-[#00ADB5]'
                        : 'border-[oklch(0.274_0.006_286.033)]'
                    }
                    ${active ? 'animate-[pulse_2s_infinite_0.6s]' : ''}
                  `}
                >
                    <div
                        className={`
                        w-4 h-4 rounded-full border-2
                        transition-all duration-1000 ease-in-out
                        ${visualState
                            ? 'border-[#00ADB5]'
                            : 'border-[oklch(0.274_0.006_286.033)]'
                        }
                        ${active ? 'animate-[pulse_2s_infinite_0.6s]' : ''}
                      `}
                    ></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% {
                        border-color: #00ADB5;
                        box-shadow: 0 0 0 0 rgba(0, 173, 181, 0.7);
                    }
                    50% {
                        border-color: #39e6ee;
                        box-shadow: 0 0 0 10px rgba(0, 173, 181, 0);
                    }
                    100% {
                        border-color: #00ADB5;
                        box-shadow: 0 0 0 0 rgba(0, 173, 181, 0);
                    }
                }
            `}</style>
        </span>
    );
}

export default BotAvatar;