'use client';

import React from 'react';

interface MindBatteryProps {
    positivePercentage: number;
}

export default function MindBatteryComponent({ positivePercentage }: MindBatteryProps) {
    // Ensure percentage is between 0 and 100
    const pos = Math.max(0, Math.min(100, positivePercentage));
    const neg = 100 - pos;

    const isDanger = pos < 30;

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-[--text-secondary]">심리적 자원 (Energy)</span>
                {isDanger && (
                    <span className="px-2 py-0.5 rounded bg-[--text-danger] text-white text-[10px] font-black animate-pulse">
                        방전 위험
                    </span>
                )}
            </div>

            <div className="w-full h-[30px] rounded-full overflow-hidden flex bg-[#333] relative shadow-inner">
                {/* Positive Bar */}
                <div
                    className="h-full flex items-center justify-center text-[10px] font-black text-white/90 transition-all duration-1000 ease-out"
                    style={{
                        width: `${pos}%`,
                        backgroundColor: 'var(--status-positive-blue)',
                        boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.2)'
                    }}
                >
                    {pos > 15 && `${Math.round(pos)}%`}
                </div>

                {/* Negative Bar */}
                <div
                    className="h-full flex items-center justify-center text-[10px] font-black text-white/90 transition-all duration-1000 ease-out"
                    style={{
                        width: `${neg}%`,
                        backgroundColor: 'var(--status-negative-red)',
                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.2)'
                    }}
                >
                    {neg > 15 && `${Math.round(neg)}%`}
                </div>

                {/* Lighting Icon Overlay (Optional) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[1px] h-full bg-white/20"></div>
                </div>
            </div>

            <div className="flex justify-between text-xs font-medium text-[--text-secondary] px-1">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[--status-positive-blue]"></span>
                    <span>긍정 자원(충전)</span>
                </div>
                <div className="flex items-center gap-1">
                    <span>부정 상태(방전)</span>
                    <span className="w-2 h-2 rounded-full bg-[--status-negative-red]"></span>
                </div>
            </div>
        </div>
    );
}
