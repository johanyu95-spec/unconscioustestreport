
"use client";

import React, { useState, useEffect } from "react";
import { useTestStore } from "@/store/testStore";

// Update to use the generated images
const COMMON_QUESTIONS = [
    { id: "q1", text: "나는 지금 나의 능력을 발휘하여 성공적으로 과제를 완수할 수 있을 것 같다." },
    { id: "q2", text: "나는 이 어려운 일을 잠시 미루거나 회피하고 싶은 충동을 느낀다." },
    { id: "q3", text: "나는 이 상황에서 상황을 통제하거나 다른 사람들에게 영향을 주고 싶다." },
    { id: "q4", text: "나는 다른 사람들에게 압도되거나 약해 보일까 봐 두렵다." },
    { id: "q5", text: "나는 이 사람들과 따뜻하고 편안한 연결감을 맺고 싶다." },
    { id: "q6", text: "나는 이 상황에서 거절당하거나 외톨이가 될까 봐 불안하다." }
];

const IMAGES = [
    {
        id: "img_hero",
        src: "/images/test/hero.png",
        text: "복잡한 퍼즐이나 어려운 장비 앞에서 홀로 작업에 몰입하는 인물",
        questions: COMMON_QUESTIONS
    },
    {
        id: "img_ruler",
        src: "/images/test/ruler.png",
        text: "회의 테이블이나 무대 위에서 다수의 시선을 받으며 발표하거나 지시하는 인물",
        questions: COMMON_QUESTIONS
    },
    {
        id: "img_lover",
        src: "/images/test/lover.png",
        text: "두 인물 간의 정서적 교감 또는 갈등이 모호하게 표현된 장면",
        questions: COMMON_QUESTIONS
    },
    {
        id: "img_creator",
        src: "/images/test/creator.png",
        text: "여러 사람이 팀으로 협력하여 독창적인 구조물을 만드는 장면",
        questions: COMMON_QUESTIONS
    },
    {
        id: "img_helper",
        src: "/images/test/helper.png",
        text: "한 인물이 다른 인물을 위로하거나 돕고 있는 장면",
        questions: COMMON_QUESTIONS
    },
    {
        id: "img_sage",
        src: "/images/test/sage.png",
        text: "안개가 낀 길 앞에서 지도나 나침반을 들고 고민하는 고독한 인물",
        questions: COMMON_QUESTIONS
    }
];

export default function ImplicitMotiveTest() {
    const { setStep, setImplicitAnswer } = useTestStore();
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    const [isTransitioning, setIsTransitioning] = useState(false);

    // Safety check for undefined image
    const currentImage = IMAGES[currentImgIndex] || IMAGES[0];
    const currentQuestion = currentImage?.questions?.[currentQuestionIndex] || { id: "error", text: "Error" };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [currentImgIndex]);

    const handleAnswer = (val: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        // Save Answer
        setImplicitAnswer(`${currentImage.id}_${currentQuestion.id}`, val);

        // Transition Delay for visual feedback
        setTimeout(() => {
            if (currentQuestionIndex < currentImage.questions.length - 1) {
                // Next Question in same image
                setCurrentQuestionIndex((prev) => prev + 1);
                setIsTransitioning(false);
            } else {
                // Image Done
                if (currentImgIndex < IMAGES.length - 1) {
                    // Next Image
                    setCurrentImgIndex((prev) => prev + 1);
                    setCurrentQuestionIndex(0);
                    setTimeLeft(30);
                    setIsTransitioning(false);
                } else {
                    // All Images Done -> Next Section
                    setStep("EXPLICIT");
                    // No unlock needed as component unmounts
                }
            }
        }, 300); // 300ms delay for smooth transition
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-6 pb-20 min-h-[80vh] flex flex-col">
            <h2 className="text-xl font-bold text-center">무의식 탐색 ({currentImgIndex + 1}/{IMAGES.length})</h2>

            {/* Timer & Progress */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div
                    className={`h-1.5 rounded-full transition-all duration-1000 ${timeLeft < 10 ? 'bg-red-500' : 'bg-black'}`}
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                />
            </div>

            {/* Image Area */}
            <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-video key={`img-${currentImgIndex}`}">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={currentImage.src}
                    alt="Test Image"
                    className="w-full h-full object-contain animate-in fade-in duration-500"
                />
            </div>

            <p className="text-gray-600 italic text-center text-sm">{currentImage.text}</p>

            {/* Single Question Area */}
            <div
                className="flex-1 flex flex-col justify-center space-y-8 animate-in slide-in-from-right fade-in duration-300"
                key={`${currentImgIndex}-${currentQuestionIndex}`}
            >
                <p className="text-xl font-bold text-center text-gray-900 leading-relaxed">
                    &quot;{currentQuestion.text}&quot;
                </p>

                <div className="space-y-4">
                    <div className="flex justify-between px-2 text-sm text-gray-500 font-medium">
                        <span>전혀 아니다</span>
                        <span>매우 그렇다</span>
                    </div>

                    <div className="flex justify-between gap-3">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <button
                                key={val}
                                onClick={() => handleAnswer(val)}
                                disabled={isTransitioning}
                                className={`flex-1 aspect-square rounded-2xl border-2 text-xl font-bold shadow-sm transition-all
                                    ${isTransitioning
                                        ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:scale-110 active:scale-95 active:bg-blue-50'
                                    }`}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Progress of questions within image */}
            <div className="text-center text-xs text-gray-400">
                {currentQuestionIndex + 1} / {currentImage.questions.length}
            </div>
        </div>
    );
}
