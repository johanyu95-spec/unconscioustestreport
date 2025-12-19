'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import IntroStage from './components/IntroStage';
import IATStage from './components/IATStage';
import ImplicitStage from './components/ImplicitStage';
import ExplicitStage from './components/ExplicitStage';
import WellbeingStage from './components/WellbeingStage';
import { calculatePAIMAIndicators } from '../../lib/resultCalculator';
// ... imports

type TestStage = 'INTRO' | 'IAT' | 'IMPLICIT' | 'EXPLICIT' | 'WELLBEING';

export default function TestPage() {
    const router = useRouter();
    const [currentStage, setCurrentStage] = useState<TestStage>('INTRO');
    const [results, setResults] = useState<any>({});

    const stages: TestStage[] = ['INTRO', 'IAT', 'IMPLICIT', 'EXPLICIT', 'WELLBEING'];

    const handleBack = () => {
        const currentIndex = stages.indexOf(currentStage);
        if (currentIndex > 0) {
            setCurrentStage(stages[currentIndex - 1]);
        } else {
            router.back();
        }
    };

    const handleStageComplete = (stageResult: any) => {
        const updatedResults = { ...results, ...stageResult };
        setResults(updatedResults);

        const currentIndex = stages.indexOf(currentStage);
        if (currentIndex < stages.length - 1) {
            setCurrentStage(stages[currentIndex + 1]);
        } else {
            // Finish Test - Calculate PAIMA Indicators
            const finalResults = { ...updatedResults }; // Copy
            const paimaIndicators = calculatePAIMAIndicators(finalResults);

            const completeData = {
                ...finalResults,
                paima: paimaIndicators
            };

            console.log("Test Complete", completeData);
            // Save results to localStorage
            localStorage.setItem('testResults', JSON.stringify(completeData));
            router.push('/report');
        }
    };

    const getStageComponent = () => {
        switch (currentStage) {
            case 'INTRO':
                return <IntroStage onComplete={() => handleStageComplete({})} />;
            case 'IAT':
                return <IATStage onComplete={(data) => handleStageComplete({ iat: data })} />;
            case 'IMPLICIT':
                return <ImplicitStage onComplete={(data) => handleStageComplete({ implicit: data })} />;
            case 'EXPLICIT':
                return <ExplicitStage onComplete={(data) => handleStageComplete({ explicit: data })} />;
            case 'WELLBEING':
                return <WellbeingStage onComplete={(data) => handleStageComplete({ wellbeing: data })} />;
            default:
                return null;
        }
    };

    const stageTitles = {
        'INTRO': '검사 소개',
        'IAT': '무의식 반응 검사',
        'IMPLICIT': '투사적 이미지 검사',
        'EXPLICIT': '자기 보고 식별',
        'WELLBEING': '마음 건강 분석'
    };

    return (
        <div className="min-h-screen bg-[--background] text-[--text-primary] font-sans-kr pb-safe">
            {/* Test Header */}
            <header className="fixed top-0 left-0 right-0 h-14 flex items-center px-4 bg-[--background]/80 backdrop-blur-md z-50 border-b border-gray-100">
                <button
                    onClick={handleBack}
                    className="p-2 -ml-2 text-[--primary] hover:opacity-70 transition-opacity"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-sm tracking-widest uppercase font-serif-kr">
                    {stageTitles[currentStage]}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-14 h-screen">
                {getStageComponent()}
            </main>
        </div>
    );
}
