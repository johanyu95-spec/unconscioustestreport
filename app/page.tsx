
"use client";

import React, { useEffect } from "react";
import { useTestStore } from "@/store/testStore";
import IATTest from "@/components/IATTest";
import ImplicitMotiveTest from "@/components/survey/ImplicitMotiveTest";
import ExplicitMotiveTest from "@/components/survey/ExplicitMotiveTest";
import WellbeingTest from "@/components/survey/WellbeingTest";
import TestGuide from "@/components/TestGuide";
import { useRouter } from "next/navigation";
import { ScoringEngine } from "@/lib/ScoringEngine";

export default function HomePage() {
    const { currentStep, setStep, setIatResults, iatResults, implicitAnswers, explicitAnswers, wellbeingAnswers, explicitGoal, setTestResult } = useTestStore();
    const router = useRouter();

    // Splash Screen Logic
    const [isFadingOut, setIsFadingOut] = React.useState(false);
    const [isZooming, setIsZooming] = React.useState(false);

    useEffect(() => {
        if (currentStep === "INTRO") {
            // Trigger Zoom immediately
            const zoomTimer = setTimeout(() => setIsZooming(true), 100);

            // 1. Wait 3 seconds
            const timer1 = setTimeout(() => {
                setIsFadingOut(true); // Trigger Fade Out
            }, 3000);

            // 2. Navigate after Fade Out (e.g. 1 sec duration)
            const timer2 = setTimeout(() => {
                // Navigate to Test
                router.push('/test');
            }, 4000);

            return () => {
                clearTimeout(zoomTimer);
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [currentStep, router]);

    // ... (rest of code)

    const renderContent = () => {
        switch (currentStep) {
            case "INTRO":
                return (
                    <div className={`flex flex-col items-center justify-center min-h-screen bg-black transition-opacity duration-1000 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                        {/* Logo/Splash Image */}
                        <div className="relative w-full max-w-md aspect-square animate-in slide-in-from-bottom-10 fade-in duration-1000">
                            {/* Glow Effect behind logo */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>

                            <img
                                src="/intro_splash.png"
                                alt="Unconscious Test Intro"
                                className={`w-full h-full object-contain drop-shadow-2xl relative z-10 transition-transform duration-[4000ms] ease-out ${isZooming ? 'scale-125' : 'scale-100'}`}
                            />
                        </div>
                    </div>
                );

            case "GUIDE":
                return <TestGuide onStart={() => setStep("IAT")} onBack={() => setStep("INTRO")} />;
            case "IAT":
                return <IATTest onComplete={(res) => { setIatResults(res); setStep("IMPLICIT"); }} />;
            case "IMPLICIT":
                return <ImplicitMotiveTest />;
            case "EXPLICIT":
                return <ExplicitMotiveTest />;
            case "ANALYZING":
                return (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-lg font-bold text-gray-700">분석 중입니다...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {renderContent()}
        </main>
    );


}
