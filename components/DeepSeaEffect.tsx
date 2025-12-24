'use client';

import React, { useEffect, useState } from 'react';

export default function DeepSeaEffect({ children }: { children: React.ReactNode }) {
    const [bubbles, setBubbles] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        // Create random bubbles
        const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // 0-100%
            size: Math.random() * 10 + 5, // 5-15px
            delay: Math.random() * 5, // 0-5s delay
            duration: Math.random() * 10 + 10, // 10-20s duration
        }));
        setBubbles(newBubbles);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] text-white overflow-hidden font-sans-kr selection:bg-blue-500/30">
            {/* Background Gradient & Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/50"></div>
                {/* Sun rays from top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[500px] bg-gradient-to-b from-blue-400/10 to-transparent blur-3xl rounded-[100%] pointer-events-none"></div>
            </div>

            {/* Bubbles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        className="absolute bottom-[-20px] rounded-full bg-blue-400/20 backdrop-blur-sm border border-blue-300/10 animate-float-up"
                        style={{
                            left: `${bubble.left}%`,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            animationDelay: `${bubble.delay}s`,
                            animationDuration: `${bubble.duration}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Content using Relative Z-Index */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            <style jsx>{`
                @keyframes float-up {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 0.5; }
                    50% { transform: translateY(-50vh) translateX(20px); opacity: 0.8; }
                    100% { transform: translateY(-120vh) translateX(-20px); opacity: 0; }
                }
                .animate-float-up {
                    animation-name: float-up;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
