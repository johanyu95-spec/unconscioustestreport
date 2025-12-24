'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ScanFace, GitGraph, ArrowRight } from 'lucide-react';

interface IntroStageProps {
    onComplete: () => void;
}

export default function IntroStage({ onComplete }: IntroStageProps) {
    const [showPromo, setShowPromo] = useState(false);

    useEffect(() => {
        // Show promo on mount with a slight delay for effect
        const timer = setTimeout(() => setShowPromo(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full min-h-[85vh] flex flex-col bg-[#F9FAFB] text-gray-900 font-sans pb-32 relative -mx-6 -my-6 sm:mx-0 sm:my-0 text-center">

            {/* Header: Minimal & Trustworthy */}
            <header className="pt-10 px-6 pb-6 flex justify-center items-center h-20">
                <div className="px-5 py-2 rounded-full bg-white border border-gray-100 shadow-sm flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-800">PRISM LAB</span>
                </div>
            </header>

            <main className="flex-1 px-6 pt-8 flex flex-col items-center animate-in slide-in-from-bottom-5 fade-in duration-700">

                {/* Headline: Clear & Impactful */}
                <div className="mb-12 space-y-4">
                    <h1 className="text-[36px] font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                        무의식은<br />
                        <span className="text-gray-900 border-b-4 border-blue-100 pb-1">답을 알고 있습니다</span>
                    </h1>
                    <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
                        0.1초의 반응 속도와 투사적 이미지는<br />
                        거짓말을 하지 못합니다.
                    </p>
                </div>

                {/* Structured Process Flow - Minimal Vertical Layout */}
                <div className="w-full max-w-xs relative flex flex-col gap-3 items-center">

                    {/* Vertical Connecting Line (Subtle) */}
                    <div className="absolute left-1/2 top-6 bottom-6 w-[1px] bg-gray-200 -translate-x-1/2 z-0"></div>

                    {/* Step 1: Discovery */}
                    <div className="relative z-10 w-full bg-white p-6 rounded-[28px] ring-1 ring-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-700 mb-1">
                            <ScanFace className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-[17px] mb-1.5">숨겨진 욕망 발견</h3>
                            <p className="text-[13px] text-gray-500 leading-snug break-keep">
                                나도 몰랐던 내면의 진짜 목소리를<br />정밀하게 포착합니다.
                            </p>
                        </div>
                    </div>

                    {/* Step 2: Pattern */}
                    <div className="relative z-10 w-full bg-white p-6 rounded-[28px] ring-1 ring-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-700 mb-1">
                            <GitGraph className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-[17px] mb-1.5">행동 패턴 이해</h3>
                            <p className="text-[13px] text-gray-500 leading-snug break-keep">
                                반복되는 선택의 원인을<br />데이터로 분석합니다.
                            </p>
                        </div>
                    </div>

                    {/* Step 3: Change (Highlighted) */}
                    <div className="relative z-10 w-full bg-gray-900 p-6 rounded-[28px] shadow-lg shadow-gray-900/10 flex flex-col items-center text-center gap-3 transform translate-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-1 backdrop-blur-sm">
                            <Sparkles className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-[17px] mb-1.5">진정한 변화</h3>
                            <p className="text-[13px] text-gray-400 leading-snug break-keep">
                                무의식을 의식화할 때<br />비로소 운명은 바뀝니다.
                            </p>
                        </div>
                    </div>

                </div>

            </main>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB] to-transparent z-40 flex justify-center pb-10">
                <button
                    onClick={onComplete}
                    className="w-full max-w-xs h-[68px] bg-black text-white rounded-[24px] font-bold text-[16px] shadow-2xl shadow-gray-900/20 active:scale-[0.98] transition-all flex items-center justify-between px-8 group relative overflow-hidden"
                >
                    <div className="flex flex-col items-start leading-none gap-1.5 relative z-10">
                        <span className="text-[10px] text-white/50 tracking-wider font-medium group-hover:text-white/70 transition-colors uppercase">Start Journey</span>
                        <span className="text-[17px]">내 무의식 확인하기</span>
                    </div>

                    {/* Circle Icon Button */}
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors relative z-10">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>

            {/* PROMO POPUP MODAL */}
            {showPromo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
                    <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)] border border-blue-500/20 relative animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">

                        {/* Decorative Background (Top) */}
                        <div className="absolute top-0 inset-x-0 h-40 bg-black">
                            {/* Blue Glow Effects inside black bg */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/30 rounded-full blur-[50px] animate-pulse"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        </div>

                        {/* Close Button (Top Right) */}
                        <button
                            onClick={() => setShowPromo(false)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/10 backdrop-blur-md rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative pt-12 px-8 pb-10 text-center flex flex-col items-center">

                            {/* Logo Section on Black Background */}
                            <div className="mb-8 relative z-10">
                                <div className="flex flex-col items-center gap-3">
                                    {/* Company Logo Container */}
                                    <div className="w-24 h-24 flex items-center justify-center bg-transparent">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/images/logo_lm_pd.png"
                                            alt="LM PD Logo"
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="-mt-3 relative z-10">
                                {/* Badge */}
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-5 border border-blue-100 shadow-sm">
                                    Soft Launching
                                </span>

                                {/* Headline */}
                                <h3 className="text-[22px] font-extrabold text-gray-900 mb-3 leading-snug tracking-tight">
                                    심층 분석 리포트<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">무료 제공 이벤트</span>
                                </h3>

                                {/* Description */}
                                <div className="space-y-4 mb-9">
                                    <p className="text-gray-600 text-[14px] leading-relaxed break-keep font-medium">
                                        <strong>PRISM 소프트 런칭</strong>을 기념하여<br />
                                        지금 검사를 진행하시는 모든 분들께<br />
                                        심층 분석 리포트를 <strong>무료</strong>로 제공합니다.
                                    </p>

                                    {/* Paid Notice - Minimal Style */}
                                    <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/80">
                                        <p className="text-[11px] text-gray-400 break-keep leading-relaxed">
                                            ※ 정식 오픈 시에는 정밀 리포트가 유료(Premium) 컨텐츠로 전환되어 만나보실 수 있습니다.
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => setShowPromo(false)}
                                    className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-[15px] shadow-xl shadow-gray-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 ring-1 ring-black/5"
                                >
                                    무료로 분석 받기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
