
"use client";

import React, { useState } from "react";
import { useTestStore } from "@/store/testStore";

const QUESTIONS = [
    { id: "wb1", text: "나는 내 삶의 방향을 스스로 결정한다고 느낀다. (Autonomy)" },
    { id: "wb2", text: "나는 내가 하는 일에 자신감이 있다. (Competence)" },
    { id: "wb3", text: "나는 주위에 의지할 수 있는 사람들이 있다. (Relatedness)" },
    // ... Add full 18 questions
];

export default function WellbeingTest() {
    const { setStep, setWellbeingAnswer } = useTestStore();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentQuestion = QUESTIONS[currentQuestionIndex];

    const handleAnswer = (val: number) => {
        setWellbeingAnswer(currentQuestion.id, val);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        setStep("ANALYZING");
        // Simulate processing time
        setTimeout(() => {
            // Processing done, likely handled by parent or effects
        }, 2000);
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-8 animate-in slide-in-from-right min-h-[80vh] flex flex-col">
            <h2 className="text-xl font-bold text-center text-gray-400">나의 마음 건강 (Wellbeing)</h2>

            <div className="flex-1 flex flex-col justify-center space-y-8" key={currentQuestion.id}>
                <p className="text-2xl font-bold text-center text-gray-900 leading-relaxed">
                    <span className="text-blue-500 mr-2">{currentQuestionIndex + 1}.</span>
                    {currentQuestion.text}
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
                                className="flex-1 aspect-square rounded-2xl bg-white border-2 border-gray-100 text-xl font-bold text-gray-600 shadow-sm hover:border-blue-500 hover:text-blue-600 hover:scale-110 transition-all active:scale-95 active:bg-blue-50"
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-400">
                {currentQuestionIndex + 1} / {QUESTIONS.length}
            </div>
        </div>
    );
}
