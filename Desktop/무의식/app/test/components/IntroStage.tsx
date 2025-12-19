'use client';

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface IntroStageProps {
    onComplete: () => void;
}

export default function IntroStage({ onComplete }: IntroStageProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0, 0, 0, 1] as any } }
    };

    return (
        <div className="min-h-full flex flex-col bg-[#FBFBFE] relative overflow-y-auto custom-scrollbar">
            {/* Hypnotic Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden fixed">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-50/50 rounded-full blur-[100px] animate-pulse transition-all duration-5000"></div>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-200 rounded-full blur-sm animate-ping"></div>
            </div>

            <motion.div
                key="intro"
                className="relative z-10 flex flex-col flex-1 justify-between px-6 py-6 md:py-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* Top Section */}
                <div className="space-y-5 mt-2">
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-[10px] font-black uppercase tracking-[0.2em] text-black/60 shadow-sm border border-white/50">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        Psychological Journey
                    </motion.div>

                    <div className="space-y-3">
                        <motion.h1 variants={itemVariants} className="text-[1.8rem] md:text-[2.2rem] font-black font-serif-kr text-gray-900 leading-[1.3] tracking-tight">
                            나조차 몰랐던 내 안의 또 다른 나,<br />
                            마음의 지도 <span className="text-gray-400 italic">95%</span> 뒤에 숨겨진<br />
                            이야기를 함께 찾아보시겠어요?
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-[13px] md:text-[14px] text-gray-400 font-medium leading-relaxed max-w-[320px]">
                            말로는 다 설명 못할 당신만의 깊은 무늬,<br />
                            그 은밀한 본성이 깨어나는 순간.
                        </motion.p>
                    </div>
                </div>

                {/* Experience Path (Artistic & Fluid Layout) */}
                <div className="space-y-4 md:space-y-5 my-6 md:my-8">
                    {[
                        {
                            title: "95%의 숨겨진 엔진",
                            desc: "우리의 생각과 행동의 95%는 무의식이 결정합니다. 의식이 알아차리기 전, 무의식은 이미 답을 알고 움직입니다.",
                            icon: "01",
                            accent: "from-blue-50/50 to-transparent"
                        },
                        {
                            title: "경이로운 연산 속도",
                            desc: "의식은 1초에 약 40비트의 정보를 처리하지만, 무의식은 1,100만 비트 이상의 정보를 처리하는 초고성능 프로세서입니다.",
                            icon: "02",
                            accent: "from-purple-50/50 to-transparent"
                        },
                        {
                            title: "진정한 나를 만나는 통로",
                            desc: "사회적 가면(Persona) 뒤에 숨겨진 본연의 욕구와 동기를 이해하면, 삶의 방향을 결정하는 강력한 통찰력을 얻게 됩니다.",
                            icon: "03",
                            accent: "from-gray-50/50 to-transparent"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className={`relative p-4 md:p-5 rounded-3xl bg-gradient-to-br ${item.accent} border border-white/60 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-500`}
                        >
                            {/* Subtle Number Background */}
                            <div className="absolute top-[-10px] right-[-10px] text-5xl font-black text-black/[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 font-serif">
                                {item.icon}
                            </div>

                            <div className="flex flex-col gap-1 relative z-10">
                                <h3 className="font-black text-gray-900 text-[15px] md:text-[16px] tracking-tight font-serif-kr flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors duration-500"></span>
                                    {item.title}
                                </h3>
                                <p className="text-[12px] md:text-[13px] text-gray-500/90 leading-relaxed font-medium pl-3.5">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Start Button Section */}
                <motion.div variants={itemVariants} className="pb-2">
                    <button
                        onClick={onComplete}
                        className="w-full group relative flex flex-col items-center justify-center py-4 md:py-5 bg-black text-white rounded-[1.8rem] font-bold text-lg shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transition-all duration-500 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>

                        <div className="relative z-10 flex items-center gap-3">
                            <span className="tracking-[0.4em] uppercase text-[9px] opacity-40 font-black">Open Mind</span>
                            <div className="w-1.2 h-1.2 rounded-full bg-blue-400 animate-ping"></div>
                        </div>
                        <span className="relative z-10 text-lg md:text-xl font-black mt-0.5">무의식의 문 열기</span>
                    </button>
                </motion.div>
            </motion.div>

            {/* Global Keyframes for Shimmer */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}
