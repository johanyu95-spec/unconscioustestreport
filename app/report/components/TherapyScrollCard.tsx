'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Eye, Ear, Coffee, Hand, Wind } from 'lucide-react';

export type TherapyType = 'visual' | 'auditory' | 'taste' | 'smell' | 'touch';

interface TherapyCardProps {
    items: {
        id: string;
        title: string;
        image: string;
        description: string;
        keywords: string[];
        type: TherapyType;
    }[];
}

const SenseIcons = {
    visual: { icon: Eye, label: '시각', color: 'bg-blue-500/20 text-blue-300' },
    auditory: { icon: Ear, label: '청각', color: 'bg-purple-500/20 text-purple-300' },
    taste: { icon: Coffee, label: '미각', color: 'bg-orange-500/20 text-orange-300' },
    smell: { icon: Wind, label: '후각', color: 'bg-green-500/20 text-green-300' },
    touch: { icon: Hand, label: '촉각', color: 'bg-pink-500/20 text-pink-300' },
};

export default function TherapyScrollCard({ items }: TherapyCardProps) {
    const [selectedItem, setSelectedItem] = useState<null | typeof items[0]>(null);

    return (
        <div className="w-full space-y-4">
            <h3 className="text-lg font-bold text-[--text-primary] px-1 flex items-center gap-2">
                <span className="text-xl">🌿</span> 오감 테라피
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory px-1 custom-scrollbar">
                {items.map((item, index) => {
                    const Sense = SenseIcons[item.type] || SenseIcons.visual;
                    const Icon = Sense.icon;

                    return (
                        <motion.div
                            key={item.id}
                            layoutId={`card-${item.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedItem(item)}
                            className="flex-none w-[160px] h-[200px] rounded-[var(--border-radius-card)] relative overflow-hidden snap-start shadow-lg cursor-pointer group bg-black"
                        >
                            {/* Background Image */}
                            <motion.div
                                layoutId={`image-${item.id}`}
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                            {/* Sense Badge */}
                            <div className={`absolute top-3 left-3 p-1.5 rounded-full backdrop-blur-md border border-white/10 ${Sense.color}`}>
                                <Icon className="w-3.5 h-3.5" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                <motion.h4 layoutId={`title-${item.id}`} className="text-white font-bold text-sm leading-tight group-hover:text-[--text-highlight] transition-colors">
                                    {item.title}
                                </motion.h4>
                                <div className="h-0.5 w-8 bg-white/30 mt-2 group-hover:w-full transition-all duration-300"></div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        {/* Card Content */}
                        <motion.div
                            layoutId={`card-${selectedItem.id}`}
                            className="w-full max-w-sm bg-[--bg-card] rounded-3xl overflow-hidden relative z-10 shadow-2xl border border-white/10"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/20 backdrop-blur-md rounded-full text-white/80 hover:bg-black/40 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Header */}
                            <div className="relative h-64 w-full">
                                <motion.div
                                    layoutId={`image-${selectedItem.id}`}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${selectedItem.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[--bg-card]" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md ${SenseIcons[selectedItem.type].color}`}>
                                            {SenseIcons[selectedItem.type].label} Therapy
                                        </span>
                                    </div>
                                    <motion.h2 layoutId={`title-${selectedItem.id}`} className="text-2xl font-black text-white mb-2">
                                        {selectedItem.title}
                                    </motion.h2>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.keywords.map((keyword) => (
                                            <span key={keyword} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-[--text-highlight] font-bold border border-white/5">
                                                #{keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            {/* Text Body */}
                            <div className="p-6 pt-0 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-[--text-secondary] text-xs font-bold uppercase tracking-wider">
                                        <Sparkles className="w-4 h-4 text-[--text-highlight]" />
                                        Why it helps
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed font-light">
                                        {selectedItem.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-sm transition-colors"
                                >
                                    확인했어요
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
