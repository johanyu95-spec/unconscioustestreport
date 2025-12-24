'use client';

import React, { useMemo } from 'react';

interface OverlapCircleChartProps {
    data: {
        subject: string;
        B: number; // Explicit (Persona)
        A: number; // Implicit (Shadow)
        fullMark: number;
    }[];
    psci?: number; // Z-score of PSCI
}

export default function OverlapCircleComponent({ data, psci = 0 }: OverlapCircleChartProps) {
    // Memoize validation
    const isValid = useMemo(() => data && data.length >= 3, [data]);

    // Calculate chart data
    const { circleA, circleB, distance, overlapPercent, conflictLevel } = useMemo(() => {
        if (!isValid) return { circleA: { x: 0, y: 0, r: 0 }, circleB: { x: 0, y: 0, r: 0 }, distance: 0, overlapPercent: 0, conflictLevel: 'Low' };

        // 1. Calculate Total Energy (Radius)
        let totalA = 0;
        let totalB = 0;
        data.forEach(d => {
            totalA += d.A;
            totalB += d.B;
        });

        // Base radius 50 + score factor
        const rA = 50 + (totalA / data.length) * 0.4;
        const rB = 50 + (totalB / data.length) * 0.4;

        // 2. Calculate Psychological Distance based on PSCI
        // PSCI: -2 (Integrated) to +2 (Conflict)
        // Map to pixels: 0px to 160px
        const psciClamped = Math.max(-2, Math.min(2, psci));
        const conflictRatio = (psciClamped + 2) / 4; // 0..1
        const targetDistance = conflictRatio * 160;

        // 3. Layout (Horizontal Centered)
        const width = 320;
        const height = 220;
        const centerY = height / 2 - 20;
        const centerX = width / 2;

        const posA = {
            x: centerX - targetDistance / 2, // Moves Left (Separation)
            y: centerY,
            r: rA
        };

        const posB = {
            x: centerX + targetDistance / 2, // Moves Right (Separation)
            y: centerY,
            r: rB
        };

        const maxDisplayDist = 160;
        const matchPercent = Math.max(0, Math.round(100 - (targetDistance / maxDisplayDist * 100)));

        // Conflict Level Text
        let level = '통합 (Integration)';
        if (targetDistance > 50) level = '경미한 갈등 (Mild)';
        if (targetDistance > 100) level = '심각한 갈등 (Severe)';

        return {
            circleA: posA,
            circleB: posB,
            distance: targetDistance,
            overlapPercent: matchPercent,
            conflictLevel: level
        };

    }, [data, psci, isValid]);

    if (!isValid) return <div>No Data</div>;

    const width = 320;
    const height = 220;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative w-[320px] h-[220px]">
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">

                    {/* 1. LAYER 1: Background Axis / Ruler */}
                    <g opacity="0.4">
                        <line x1="20" y1={height - 40} x2="300" y2={height - 40} stroke="#94a3b8" strokeWidth="1" />

                        {/* Ticks & Labels */}
                        {/* Center: Integration */}
                        <line x1="160" y1={height - 40} x2="160" y2={height - 35} stroke="#94a3b8" strokeWidth="1" />
                        <text x="160" y={height - 25} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748b">통합 (Integration)</text>

                        {/* Left: Separation */}
                        <line x1="20" y1={height - 40} x2="20" y2={height - 35} stroke="#94a3b8" strokeWidth="1" />
                        <text x="20" y={height - 25} textAnchor="start" fontSize="9" fill="#94a3b8">분리 (Separation)</text>

                        {/* Right: Separation */}
                        <line x1="300" y1={height - 40} x2="300" y2={height - 35} stroke="#94a3b8" strokeWidth="1" />
                        <text x="300" y={height - 25} textAnchor="end" fontSize="9" fill="#94a3b8">분리 (Separation)</text>
                    </g>

                    {/* 2. LAYER 2: Circles (Behind Indicator) */}

                    {/* Circle A: Unconscious (Shadow) - Flat Dark Gray */}
                    <g style={{ transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                        <defs>
                            {/* Keep flat, no gradient as requested */}
                        </defs>
                        <circle
                            cx={circleA.x}
                            cy={circleA.y}
                            r={circleA.r}
                            fill="#1f2937" // Dark Gray
                            fillOpacity="0.85"
                            style={{ mixBlendMode: 'multiply' }}
                        />
                        {/* Dotted border for aesthetics */}
                        <circle
                            cx={circleA.x}
                            cy={circleA.y}
                            r={circleA.r}
                            fill="none"
                            stroke="#000"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                            opacity="0.3"
                        />
                        {/* Label */}
                        <text x={circleA.x} y={circleA.y - circleA.r - 12} textAnchor="middle" className="text-xs font-bold fill-gray-900">
                            무의식 (Unconscious)
                        </text>
                        <text x={circleA.x} y={circleA.y - circleA.r - 24} textAnchor="middle" fontSize="9" fill="#6b7280">
                            Size: {Math.round(circleA.r)}
                        </text>
                    </g>

                    {/* Circle B: Conscious (Persona) - Flat Green */}
                    <g style={{ transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                        <circle
                            cx={circleB.x}
                            cy={circleB.y}
                            r={circleB.r}
                            fill="#10b981" // Emerald Green
                            fillOpacity="0.75"
                            style={{ mixBlendMode: 'multiply' }}
                        />
                        <circle
                            cx={circleB.x}
                            cy={circleB.y}
                            r={circleB.r}
                            fill="none"
                            stroke="#047857"
                            strokeWidth="1"
                            opacity="0.5"
                        />
                        {/* Label */}
                        <text x={circleB.x} y={circleB.y + circleB.r + 20} textAnchor="middle" className="text-xs font-bold fill-emerald-700">
                            의식 (Conscious)
                        </text>
                        <text x={circleB.x} y={circleB.y + circleB.r + 32} textAnchor="middle" fontSize="9" fill="#9ca3af">
                            Size: {Math.round(circleB.r)}
                        </text>
                    </g>

                    {/* 3. LAYER 3: Distance Indicator (ON TOP) */}
                    {Math.abs(circleA.x - circleB.x) > 10 && (
                        <g>
                            {/* Connecting Line */}
                            <line x1={circleA.x} y1={circleA.y} x2={circleB.x} y2={circleB.y} stroke="#ef4444" strokeWidth="2" strokeDasharray="4,4" />

                            {/* Badge Background */}
                            <rect x={(circleA.x + circleB.x) / 2 - 20} y={circleA.y - 10} width="40" height="20" rx="10" fill="#ef4444" className="shadow-md" />

                            {/* Distance Text */}
                            <text x={(circleA.x + circleB.x) / 2} y={circleA.y + 4} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                                {Math.round(distance)}
                            </text>
                        </g>
                    )}

                </svg>
            </div>

            {/* Bottom Status Panel */}
            <div className="mt-2 text-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 w-full max-w-[280px]">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                    <span>일치(Sync)</span>
                    <span className="font-bold text-gray-900">{Math.round(overlapPercent)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-600 to-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${overlapPercent}%` }}></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                    현재 상태: <span className="text-gray-700 font-bold">{conflictLevel}</span>
                </p>
            </div>
        </div>
    );
}
