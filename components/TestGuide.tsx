import React from 'react';

interface TestGuideProps {
    onStart: () => void;
    onBack: () => void; // Kept in interface for compatibility but unused in UI
}

export default function TestGuide({ onStart }: TestGuideProps) {
    return (
        <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans pb-24 flex flex-col">
            {/* Header: Credibility Badge */}
            <header className="pt-8 px-6 pb-4 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-900 animate-pulse"></div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">PAIMA LAB</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">v2.4.0 verified</div>
            </header>

            <main className="flex-1 px-6 pt-6 animate-in slide-in-from-bottom-5 fade-in duration-700">

                {/* Headline Area */}
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 leading-[1.25] tracking-tight mb-4">
                        무의식은<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">거짓말을 하지 않습니다.</span>
                    </h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                        우리가 통제할 수 있는 의식은 빙산의 일각입니다.<br />
                        본 검사는 당신의 <strong>무의식적 반응 속도(IAT)</strong>와 <strong>투사적 이미지 선택</strong>을 분석하여 숨겨진 본성을 포착합니다.
                    </p>
                </div>

                {/* Methodology Infographic Card */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 mb-8 border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Analysis Logic</h3>
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                        </div>
                    </div>

                    {/* Visual Diagram */}
                    <div className="relative h-32 flex items-center justify-center bg-gray-50 rounded-xl mb-4 overflow-hidden group">
                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full text-gray-200" viewBox="0 0 300 120">
                            <path d="M50 60 L150 60 L250 60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                            <circle cx="150" cy="60" r="25" fill="white" className="drop-shadow-sm" />
                        </svg>

                        {/* Center Icon */}
                        <div className="relative z-10 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>

                        {/* Labels */}
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 pt-14 text-[10px] font-bold text-gray-400 text-center">STIMULI<br />(자극)</div>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pt-14 text-[10px] font-bold text-gray-900 text-center">RESPONSE<br />(반응)</div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-[10px] font-bold text-blue-600">1</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-snug">
                                <span className="font-bold text-gray-900">투사적 이미지 검사</span>: 모호한 이미지를 통해 내면의 동기를 이끌어냅니다.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-[10px] font-bold text-purple-600">2</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-snug">
                                <span className="font-bold text-gray-900">반응 시간 측정</span>: 고민할 틈 없는 0.1초의 반응을 정밀 측정합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                        <span className="text-2xl font-bold text-gray-900 mb-1">11M+</span>
                        <span className="text-[10px] text-gray-400">Data Points</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                        <span className="text-2xl font-bold text-gray-900 mb-1">92%</span>
                        <span className="text-[10px] text-gray-400">Self-Accuracy</span>
                    </div>
                </div>

                {/* Warning / Notice */}
                <div className="bg-gray-50 rounded-xl p-4 flex gap-3 items-start md:items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 mt-0.5 md:mt-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                        정확한 분석을 위해 <strong>직관적으로 떠오르는 답</strong>을<br className="hidden md:block" />빠르게 선택해주세요. 오랫동안 고민하면 정확도가 떨어집니다.
                    </p>
                </div>

            </main>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40">
                <button
                    onClick={onStart}
                    className="group relative w-full h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-[15px] shadow-[0_8px_20px_-5px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black group-hover:from-gray-700 group-hover:to-gray-900 transition-colors"></div>
                    <span className="relative flex items-center gap-2">
                        검사 시작하기
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
}
