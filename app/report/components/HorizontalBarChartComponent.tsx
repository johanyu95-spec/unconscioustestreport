'use client';

import React from 'react';

interface BarChartProps {
    data: {
        name: string;
        value: number; // 0-100
        warningLevel: boolean;
        desc?: string;
    }[];
}

export default function HorizontalBarChartComponent({ data }: BarChartProps) {
    // Helper to determine color based on value/warning
    const getBarColor = (value: number, isWarning: boolean) => {
        if (value > 70) return 'bg-red-500'; // High risk
        if (value > 40) return 'bg-orange-400'; // Medium risk
        return 'bg-blue-500'; // Low risk
    };

    const getLevelText = (value: number) => {
        if (value > 70) return '위험 (High)';
        if (value > 40) return '주의 (Mid)';
        return '안정 (Low)';
    };

    return (
        <div className="space-y-4 w-full">
            {data.map((item, idx) => {
                const barColor = getBarColor(item.value, item.warningLevel);
                const levelText = getLevelText(item.value);

                return (
                    <div key={idx} className="w-full">
                        <div className="flex justify-between text-xs mb-1.5 font-bold text-gray-700">
                            <span>{item.name}</span>
                            <span className={item.value > 70 ? 'text-red-600' : 'text-gray-500'}>
                                {levelText} : {Math.round(item.value)}
                            </span>
                        </div>

                        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                            {/* Bar */}
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
                                style={{ width: `${Math.min(Math.max(item.value, 5), 100)}%` }}
                            ></div>

                            {/* Critical Threshold Marker (70%) */}
                            <div className="absolute top-0 bottom-0 left-[70%] w-[1px] bg-red-300 border-l border-dashed border-red-500 opacity-50"></div>
                        </div>
                    </div>
                );
            })}

            <div className="flex justify-end mt-2">
                <span className="text-[10px] text-gray-400">
                    * 70점 이상 시 심리적 소진 주의 바람
                </span>
            </div>
        </div>
    );
}
