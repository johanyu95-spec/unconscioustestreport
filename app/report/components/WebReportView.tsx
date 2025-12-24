'use client';

import { RESULT_PROFILES } from '@/lib/resultProfiles';
import { BarChart3, AlertCircle, Sparkles, BrainCircuit } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';

import OverlapCircleComponent from './OverlapCircleComponent';
import HorizontalBarChartComponent from './HorizontalBarChartComponent';

interface WebReportViewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any;
    isAnalyzing?: boolean;
    onAnalyze?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geminiAnalysis?: any; // Now expects the full profile object if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    radarData?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    barData?: any[];
}

export default function WebReportView({
    results,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isAnalyzing = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAnalyze,
    geminiAnalysis,
    radarData,
    barData
}: WebReportViewProps) {
    const paima = results.paima || {};
    const profileKey = paima.profileKey || 'WANDERING_EXPLORER';

    // Use Gemini Generated Profile if available, otherwise static
    // Use Gemini Generated Profile if available, otherwise static
    const safeResultProfiles = RESULT_PROFILES || {};
    const fallbackProfile = safeResultProfiles['WANDERING_EXPLORER'] || {
        profile_name: '분석 중...',
        profile_summary: '데이터를 불러오는 중입니다.',
        core_theme: '',
        persona: '',
        shadow: '',
        internal_conflict: '',
        latent_potential: { reframed_shadow: '', positive_interpretation: '', development_direction: '' },
        behavioral_tendencies: '',
        risk_of_misalignment: ''
    };

    const profile = geminiAnalysis || safeResultProfiles[profileKey] || fallbackProfile;

    // Helper for Z-score formatting
    const getLevel = (z: number) => {
        if (z >= 1.0) return { label: '높음', color: 'text-blue-700', bg: 'bg-blue-600' };
        if (z <= -1.0) return { label: '낮음', color: 'text-red-700', bg: 'bg-red-600' };
        return { label: '평균', color: 'text-gray-600', bg: 'bg-gray-400' };
    };

    const getWidth = (z: number) => {
        // Map -2~2 to 0~100%
        const val = Math.min(Math.max((z * 20) + 50, 5), 95);
        return `${val}%`;
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Overlap Circle Section (Moved to Top) */}
            {radarData && (
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <BrainCircuit className="w-5 h-5 text-gray-500" />
                            <h3 className="font-bold text-gray-900">무의식(내면) vs 의식(가면) 관계성</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                            <span className="font-bold text-slate-800">검은 원(그림자)</span>과 <span className="font-bold text-purple-400">밝은 원(페르소나)</span>의 거리를 확인하세요.<br />
                            두 원이 <span className="font-bold text-blue-600">완전히 겹칠수록</span> 진정한 자아실현에 가까운 상태입니다.
                        </p>
                        <OverlapCircleComponent data={radarData} psci={paima.Z_PSCI} />
                    </div>
                </div>
            )}

            {/* 2. Profile Header Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-blue-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
                        <Sparkles className="w-3 h-3" />
                        Analysis Result
                    </div>

                    <h2 className="text-sm font-bold text-gray-500 mb-1">당신의 무의식 페르소나</h2>
                    <h1 className="text-3xl font-black font-serif-kr text-gray-900 leading-tight mb-4">
                        {profile.profile_name}
                    </h1>

                    <p className="text-base text-gray-700 leading-relaxed font-medium">
                        {profile.profile_summary}
                    </p>
                </div>
            </div>




            {/* 2. Key Metrics & Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Needs Satisfaction (Manual Bars - Keep as clean simple bars) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-gray-500" />
                        <h3 className="font-bold text-gray-900">기본 심리 욕구 충족도</h3>
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

                {/* Conflict & Energy (Horizontal Bar Chart) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5 text-gray-500" />
                        <h3 className="font-bold text-gray-900">내면 갈등과 에너지 누수</h3>
                    </div>
                    {barData ? (
                        <HorizontalBarChartComponent data={barData} />
                    ) : (
                        <p>No Data</p>
                    )}
                </div>
            </div>



        </div>
    );
}
