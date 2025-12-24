'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AchievementProps {
    text: string;
}

export default function AchievementCheckbox({ text }: AchievementProps) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        if (!checked) {
            // Trigger confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8E2DE2', '#4A00E0', '#FFD700']
            });
        }
        setChecked(!checked);
    };

    return (
        <div className="w-full mt-4">
            <input
                type="checkbox"
                id="daily-achievement"
                className="hidden"
                checked={checked}
                onChange={handleChange}
            />
            <label
                htmlFor="daily-achievement"
                className={`
                    w-full relative flex items-center gap-4 p-4 rounded-[var(--border-radius-card)] cursor-pointer
                    border transition-all duration-300 overflow-hidden group
                    ${checked
                        ? 'bg-[var(--bg-accent-gradient)] border-transparent shadow-[0_0_20px_rgba(142,45,226,0.5)]'
                        : 'bg-[var(--bg-card)] border-white/10 hover:border-white/20'
                    }
                `}
            >
                {/* Custom Checkbox Circle */}
                <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                    ${checked ? 'bg-white border-white' : 'border-gray-500 group-hover:border-gray-300'}
                `}>
                    <Check className={`w-3.5 h-3.5 ${checked ? 'text-purple-600' : 'text-transparent'}`} strokeWidth={4} />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 transition-colors ${checked ? 'text-white/70' : 'text-[--text-secondary]'}`}>
                        오늘의 작은 성취
                    </p>
                    <p className={`font-bold transition-colors ${checked ? 'text-white line-through opacity-80' : 'text-[--text-primary]'}`}>
                        {text}
                    </p>
                </div>

                {/* Background Decoration */}
                {checked && (
                    <div className="absolute right-[-20px] top-[-20px] w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                )}
            </label>
        </div>
    );
}
