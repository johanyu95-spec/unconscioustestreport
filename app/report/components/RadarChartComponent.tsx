'use client';

import React from 'react';

interface RadarChartProps {
    data: {
        subject: string;
        A: number; // Implicit
        B: number; // Explicit
        fullMark: number;
    }[];
}

export default function RadarChartComponent({ data }: RadarChartProps) {
    // Configuration
    const size = 300;
    const center = size / 2;
    const radius = 100; // Radius for 100 score
    const axes = data.map(d => d.subject);
    const totalAxes = axes.length;

    // Helper to get coordinates
    const getCoordinates = (value: number, index: number) => {
        const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2; // Start from top (-90deg)
        const x = center + (value / 100) * radius * Math.cos(angle);
        const y = center + (value / 100) * radius * Math.sin(angle);
        return { x, y };
    };

    // Helper to generate Curved Path (Cardinal Spline-ish)
    // Since we only have 3 points, we can use a simpler curve or "C" command.
    // To make it look "Circular" (round), we can control handle points.
    // A simple method for smooth closed polygon is Catmull-Rom to Bezier.
    const getPath = (values: number[]) => {
        const points = values.map((v, i) => getCoordinates(v, i));

        // If smooth curve is desired
        // SVG d: M p0 ... C cp1 cp2 p1 ...
        // For 3 points, we can just curve between them.

        const d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length; i++) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const p0 = points[i];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const p1 = points[(i + 1) % points.length];

            // Calculate Control Points (Simple curvature)
            // Or use an Arc? No, data values dictate radius.
            // Let's use Q (Quadratic) or C (Cubic) with midpoint tension.
            // Simplified: Use the axis perpendiculars?

            // Catmull-Rom SPLINE logic adaptation for SVG Path string
            // For point i, previous is i-1, next is i+1.
            // Tangent at p[i] parallel to p[i-1]-p[i+1].

            // Let's try a simpler "round joins" via L command first? 
            // User requested "Circular graphs".
            // Let's use a known spline function logic inline.
            // Or just use straight lines for now if spline is too risky without lib?
            // "feel like two different circles".
            // I will implement a basic tension curve (Cardinal Spline).

        }

        // RE-IMPLEMENTATION with simple tension
        const tension = 0.5;
        const coords = points;

        const result = [];
        // Loop through points
        for (let i = 0; i < coords.length; i++) {
            const p0 = coords[i === 0 ? coords.length - 1 : i - 1];
            const p1 = coords[i];
            const p2 = coords[(i + 1) % coords.length];
            const p3 = coords[(i + 2) % coords.length];

            // Calc control points for p1 -> p2 segment
            const cp1x = p1.x + (p2.x - p0.x) / 6 * tension;
            const cp1y = p1.y + (p2.y - p0.y) / 6 * tension;

            const cp2x = p2.x - (p3.x - p1.x) / 6 * tension;
            const cp2y = p2.y - (p3.y - p1.y) / 6 * tension;

            if (i === 0) {
                result.push(`M ${p1.x} ${p1.y}`);
            }
            result.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
        }

        return result.join(" ") + " Z";
    };

    const implicitScores = data.map(d => d.A);
    const explicitScores = data.map(d => d.B);

    // Safety check for empty data
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-[300px] md:h-[400px] relative flex items-center justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full max-w-[400px]">
                {/* 1. Background Grid (Circles) */}
                {[20, 40, 60, 80, 100].map((r, i) => (
                    <circle
                        key={i}
                        cx={center}
                        cy={center}
                        r={(r / 100) * radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                    />
                ))}

                {/* 2. Axes Lines */}
                {axes.map((_, i) => {
                    const { x, y } = getCoordinates(100, i);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* 3. Labels */}
                {axes.map((label, i) => {
                    // Push labels out a bit (radius + 20)
                    const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2;
                    const labelRadius = radius + 25;
                    const x = center + labelRadius * Math.cos(angle);
                    const y = center + labelRadius * Math.sin(angle);

                    return (
                        <g key={`label-${i}`}>
                            <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[11px] font-bold fill-gray-600"
                            >
                                {label}
                            </text>
                            {/* Score Values underneath */}
                            <text
                                x={x}
                                y={y + 12}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-[9px] font-mono fill-gray-400"
                            >
                                (IM:{data[i].A}/EX:{data[i].B})
                            </text>
                        </g>
                    );
                })}

                {/* 4. Shapes (Curved) */}

                {/* Implicit (Inner/Blue) */}
                <path
                    d={getPath(implicitScores)}
                    fill="#3b82f6"
                    fillOpacity="0.5"
                    stroke="#2563eb"
                    strokeWidth="3"
                />

                {/* Explicit (Outer/Purple) */}
                <path
                    d={getPath(explicitScores)}
                    fill="#d8b4fe"
                    fillOpacity="0.4"
                    stroke="#9333ea"
                    strokeWidth="3"
                />

                {/* Optional: Points */}
                {implicitScores.map((v, i) => {
                    const { x, y } = getCoordinates(v, i);
                    return <circle key={`im-${i}`} cx={x} cy={y} r="3" fill="#2563eb" />;
                })}
                {explicitScores.map((v, i) => {
                    const { x, y } = getCoordinates(v, i);
                    return <circle key={`ex-${i}`} cx={x} cy={y} r="3" fill="#9333ea" />;
                })}

            </svg>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-1 text-[10px] bg-white/80 p-2 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500/50 border border-blue-600"></div>
                    <span className="text-gray-600 font-bold">내면(Implicit)</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-300/50 border border-purple-600"></div>
                    <span className="text-gray-600 font-bold">가면(Explicit)</span>
                </div>
            </div>
        </div>
    );
}
