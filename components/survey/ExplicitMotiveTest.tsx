
"use client";

import React, { useState } from "react";
import { useTestStore } from "@/store/testStore";

const QUESTIONS = [
    { id: "em1", text: "나는 스스로에게 의미 있는 목표를 추구할 때 가장 큰 에너지를 얻는다" },
    { id: "em2", text: "나는 주변의 기대나 시선에 휩쓸리지 않고 나의 결정을 지지하는 편이다" },
    { id: "em3", text: "나는 현재 진행 중인 일이나 학습에서 '내가 잘하고 있다'는 느낌을 자주 받는다" },
    { id: "em4", text: "나는 새로운 도전을 할 때, 나의 능력이 충분하다고 믿는다" },
    { id: "em5", text: "나는 나의 진정한 모습을 보여줄 수 있는, 깊은 신뢰 관계를 맺고 있다" },
    { id: "em6", text: "나는 필요할 때 언제든 나를 지지해 줄 사람이 있다고 느낀다" },
    { id: "em7", text: "나는 하루 중 웃거나 긍정적인 감정을 느끼는 시간이 충분하다" },
    { id: "em8", text: "나는 대체로 낙관적이며, 미래에 대해 기대감을 느낀다" },
    { id: "em9", text: "나는 내가 하는 일이나 활동에 깊이 몰입하여 시간 가는 줄 모르는 경험을 한다" },
    { id: "em10", text: "나는 일상생활에서 흥미롭고 재미있는 일을 찾고 참여하는 편이다" },
    { id: "em11", text: "나는 나를 지지하고 이해해주는 사람들과의 관계에 만족한다" },
    { id: "em12", text: "나는 어려움을 겪을 때 도움을 청할 수 있는 믿음직한 사람이 있다" },
    { id: "em13", text: "나는 내 삶의 방향이 궁극적인 의미와 목적을 가지고 있다고 생각한다" },
    { id: "em14", text: "나는 내 삶이 나보다 더 큰 무언가에 기여하고 있다고 느낀다" },
    { id: "em15", text: "나는 내가 정한 중요한 목표들을 성공적으로 달성하고 있다는 느낌을 받는다" },
    { id: "em16", text: "나는 나의 노력과 능력을 통해 눈에 띄는 발전과 성장을 이루고 있다고 생각한다" },
    { id: "em17", text: "나는 목표를 추구하는 과정에서 자주 무기력함이나 심리적 소진을 경험한다" }, // Depletion?
    { id: "em18", text: "내가 세운 목표는 주로 타인의 인정을 받거나 사회적 지위를 높이기 위한 것이다" } // Extrinsic?
];

export default function ExplicitMotiveTest() {
    const { setStep, explicitGoal, setExplicitGoal, setExplicitAnswer } = useTestStore();
    const [goalInput, setGoalInput] = useState(explicitGoal);
    const [isGoalSubmitted, setIsGoalSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentQuestion = QUESTIONS[currentQuestionIndex];

    const handleGoalSubmit = () => {
        if (goalInput.length < 5) return;
        setExplicitGoal(goalInput);
        setIsGoalSubmitted(true);
    };

    const handleAnswer = (val: number) => {
        setExplicitAnswer(currentQuestion.id, val);

        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setStep("ANALYZING");
        }
    };

    if (!isGoalSubmitted) {
        return (
            <div className="max-w-md mx-auto p-6 space-y-8 animate-in slide-in-from-right min-h-[60vh] flex flex-col justify-center">
                <h2 className="text-2xl font-bold">의식적 목표 (Explicit Motive)</h2>

                <div className="space-y-4">
                    <label className="block font-medium text-gray-700 text-lg">
                        2026년, 당신이 성취하고 싶은<br />가장 중요한 목표는 무엇인가요?
                    </label>
                    <textarea
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        placeholder="예: 나만의 브랜드를 런칭해서 월 매출 1000만원 달성하기..."
                        className="w-full p-6 border rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none h-48 resize-none text-lg shadow-sm"
                    />
                </div>

                <button
                    onClick={handleGoalSubmit}
                    disabled={goalInput.length < 5}
                    className="w-full py-4 bg-black text-white rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                    다음으로
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-4 space-y-8 animate-in slide-in-from-right min-h-[80vh] flex flex-col">
            <h2 className="text-xl font-bold text-center text-gray-400">의식적 동기 탐색</h2>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 mb-2">당신의 목표</p>
                <p className="text-lg font-medium text-gray-800 italic">&quot;{goalInput}&quot;</p>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8" key={currentQuestion.id}>
                <p className="text-2xl font-bold text-center text-gray-900 leading-relaxed">
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
