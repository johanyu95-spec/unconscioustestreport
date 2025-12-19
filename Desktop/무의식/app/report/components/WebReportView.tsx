'use client';

import { RESULT_PROFILES } from '../../../data/resultProfiles';
import { Share2, Download, ChevronRight, BarChart3, AlertCircle, Sparkles, BrainCircuit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface WebReportViewProps {
    results: any;
    isAnalyzing?: boolean;
    onAnalyze?: () => void;
    geminiAnalysis?: string | null;
}

export default function WebReportView({
    results,
    isAnalyzing = false,
    onAnalyze,
    geminiAnalysis
}: WebReportViewProps) {
    const paima = results.paima || {};
    const profileKey = paima.profileKey || 'WANDERING_EXPLORER';
    const profile = RESULT_PROFILES[profileKey] || RESULT_PROFILES['WANDERING_EXPLORER'];

    // Helper for Z-score formatting
    const getLevel = (z: number) => {
        if (z >= 1.0) return { label: '높음', color: 'text-blue-600', bg: 'bg-blue-600' };
        if (z <= -1.0) return { label: '낮음', color: 'text-red-600', bg: 'bg-red-600' };
        return { label: '평균', color: 'text-gray-500', bg: 'bg-gray-400' };
    };

    const getWidth = (z: number) => {
        // Map -2~2 to 0~100%
        const val = Math.min(Math.max((z * 20) + 50, 5), 95);
        return `${val}%`;
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Profile Header Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-blue-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
                        <Sparkles className="w-3 h-3" />
                        Analysis Result
                    </div>

                    <h2 className="text-sm font-bold text-gray-400 mb-1">당신의 무의식 페르소나</h2>
                    <h1 className="text-3xl font-black font-serif-kr text-gray-900 leading-tight mb-4">
                        {profile.profile_name}
                    </h1>

                    <p className="text-base text-gray-600 leading-relaxed font-medium">
                        {profile.profile_summary}
                    </p>
                </div>
            </div>


            {/* 2. Key Metrics & Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Needs Satisfaction */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                        <h3 className="font-bold text-gray-900">기본 욕구 충족도</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: '자율성 (Autonomy)', z: paima.Z_N_Auto, desc: '주도적인 삶' },
                            { label: '유능감 (Competence)', z: paima.Z_N_Comp, desc: '성취와 효율' },
                            { label: '관계성 (Relatedness)', z: paima.Z_N_Rela, desc: '연결과 소속' }
                        ].map((item, idx) => {
                            const level = getLevel(item.z || 0);
                            return (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-bold text-gray-700">{item.label}</span>
                                        <span className={`font-bold ${level.color}`}>{item.desc} : {level.label}</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${level.bg}`}
                                            style={{ width: getWidth(item.z || 0) }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Conflict & Energy */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                        <h3 className="font-bold text-gray-900">내면 갈등과 에너지</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: '심리적 웰빙', z: paima.Z_W_Wellbeing, desc: '행복감' },
                            { label: '내적 갈등 (PSCI)', z: paima.Z_PSCI, desc: '괴리감' },
                            { label: '의지력 소진', z: paima.Z_C_Depletion, desc: '피로도' }
                        ].map((item, idx) => {
                            const level = getLevel(item.z || 0);
                            // Flip colors for negative metrics (Conflict/Depletion)
                            const isNegativeMetric = idx > 0;
                            let color = level.bg;
                            let textColor = level.color;

                            if (isNegativeMetric) {
                                if (level.label === '높음') {
                                    color = 'bg-red-500';
                                    textColor = 'text-red-600';
                                } else if (level.label === '낮음') {
                                    color = 'bg-green-500';
                                    textColor = 'text-green-600';
                                } else {
                                    color = 'bg-yellow-400';
                                    textColor = 'text-yellow-600';
                                }
                            }

                            return (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-bold text-gray-700">{item.label}</span>
                                        <span className={`font-bold ${textColor}`}>{item.desc} : {level.label}</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${color}`}
                                            style={{ width: getWidth(item.z || 0) }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. Detailed Interpretation Text */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-900 mb-6 font-serif-kr">심층 해석</h3>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Persona & Shadow</h4>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            <span className="font-bold text-gray-900">페르소나:</span> {profile.persona}
                            {"\n\n"}
                            <span className="font-bold text-gray-900">그림자:</span> {profile.shadow}
                        </p>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    <div>
                        <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Potential & Growth</h4>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {profile.latent_potential.positive_interpretation}
                            {"\n\n"}
                            <span className="font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">솔루션:</span> {profile.latent_potential.development_direction}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
