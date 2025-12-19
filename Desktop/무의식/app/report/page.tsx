'use client';

import React, { useEffect, useState } from 'react';
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'; // Dynamically import to avoid SSR issues
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Share2, Home, Download, Lock } from 'lucide-react';
import AnalysisReportPDF from './components/AnalysisReportPDF';
import WebReportView from './components/WebReportView';

// Dynamic import for PDF components to disable SSR
const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <p>Loading PDF Viewer...</p>,
    }
);

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <p>Loading Download Link...</p>,
    }
);

export default function ReportPage() {
    const router = useRouter();
    const [results, setResults] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(true); // Force unlock for dev
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [geminiAnalysis, setGeminiAnalysis] = useState<string | null>(null);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        setIsClient(true);
        // Load results from localStorage
        const storedResults = localStorage.getItem('testResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        } else {
            // Mock Data for Dev Viewing
            setResults({
                explicit: { explicitAnswers: { 1: 5 }, goal: "성공" },
                implicit: { implicitAnswers: { 1: 5 } },
                paima: {
                    Z_iM_Ach: 1.2, Z_iM_Pow: -0.5, Z_iM_Aff: 0.2,
                    Z_eM_Ach: 0.8, Z_eM_Pow: 0.5, Z_eM_Aff: -0.2,
                    Z_N_Auto: -0.8, Z_N_Comp: 0.5, Z_N_Rela: 1.2,
                    Z_W_Wellbeing: -0.5, Z_PSCI: 1.5, Z_C_Depletion: 1.2,
                    Z_MDI_Ach: 1.0, Z_MDI_Pow: 0.2, Z_MDI_Aff: 0.5,
                    profileKey: 'EXHAUSTED_HERO'
                }
            });
        }
    }, []);

    const handlePurchase = () => {
        setIsProcessing(true);
        // Mock payment delay
        setTimeout(() => {
            setHasPurchased(true);
            localStorage.setItem('hasPurchasedReport', 'true');
            setIsProcessing(false);
            alert("결제가 완료되었습니다! 전체 리포트를 확인하세요.");
        }, 1500);
    };

    const handleAnalyze = async () => {
        if (isAnalyzing || !results?.paima) return;
        setIsAnalyzing(true);

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scores: results.paima,
                    profile: results.paima.profileKey
                })
            });
            const data = await response.json();
            setGeminiAnalysis(data.analysis || "분석에 실패했습니다.");
        } catch (error) {
            console.error("Analysis Error:", error);
            setGeminiAnalysis("서버 연결에 실패했습니다.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSendEmail = async () => {
        if (!email.includes("@")) {
            alert("올바른 이메일 주소를 입력해주세요.");
            return;
        }

        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    resultId: results?.paima?.profileKey || "anonymous",
                    // pdfData would be sent here in a real app after generation
                })
            });

            if (response.ok) {
                alert(`성공적으로 이메일을 보냈습니다!\n(To: ${email})`);
                setShowEmailModal(false);
                setEmail("");
            } else {
                alert("이메일 전송에 실패했습니다.");
            }
        } catch (error) {
            console.error("Email Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    const handleDownloadStructuredPDF = async () => {
        setIsProcessing(true);
        try {
            const { pdf } = await import('@react-pdf/renderer');
            const doc = <AnalysisReportPDF userData={userData} results={results} aiAnalysis={geminiAnalysis} />;
            const blob = await pdf(doc).toBlob();

            // Create a link and trigger download
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `PAIMA_Report_${new Date().getTime()}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("PDF Download Error:", error);
            alert("리포트 생성 중 오류가 발생했습니다.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isClient) return null;

    if (!results) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans-kr">
                <div className="text-center space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">검사 결과가 없습니다.</h2>
                    <p className="text-gray-500 text-sm">먼저 테스트를 진행해주세요.</p>
                    <button
                        onClick={() => router.push('/test')}
                        className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform"
                    >
                        검사 하러 가기
                    </button>
                </div>
            </div>
        );
    }

    const userData = {
        name: "방문자",
        date: new Date().toLocaleDateString(),
    };

    // Calculate simple stats for Free View
    const explicitScore = results.explicit?.explicitAnswers
        ? (Object.values(results.explicit.explicitAnswers).reduce((a: any, b: any) => a + b, 0) as number) / Object.keys(results.explicit.explicitAnswers).length
        : 0;

    const implicitScore = results.implicit?.implicitAnswers
        ? (Object.values(results.implicit.implicitAnswers).reduce((a: any, b: any) => a + b, 0) as number) / Object.keys(results.implicit.implicitAnswers).length
        : 0;

    return (
        <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans-kr">
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="font-serif-kr text-xl font-bold text-gray-900">분석 결과</h1>
                <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                    <Home className="w-5 h-5" />
                </button>
            </header>

            <main className="flex-1 p-4 md:p-8 flex flex-col items-center max-w-2xl mx-auto w-full space-y-8">

                {/* Free View: Simple Stats (Always Visible) */}
                <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-black rounded-full"></span>
                        기본 분석 요약
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-2">
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">의식 수준</div>
                            <div className="text-3xl font-black text-gray-900">{explicitScore.toFixed(1)}<span className="text-sm text-gray-400 font-normal">/5.0</span></div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-2">
                            <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">무의식 수준</div>
                            <div className="text-3xl font-black text-gray-900">{implicitScore.toFixed(1)}<span className="text-sm text-gray-400 font-normal">/5.0</span></div>
                        </div>
                    </div>

                    <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <p className="text-sm text-blue-900 leading-relaxed font-medium">
                            {Math.abs(explicitScore - implicitScore) < 1
                                ? "당신의 의식과 무의식은 비교적 잘 일치하고 있습니다. 갈등이 적고 안정적인 상태입니다."
                                : "당신의 표면적인 생각과 깊은 무의식 사이에 차이가 발견되었습니다. 이 간극이 현재의 고민일 수 있습니다."}
                        </p>
                    </div>
                </div>

                {/* Paid View / Locked View */}
                {hasPurchased ? (
                    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                        {/* 1. Web Report View (Immediate Analysis) */}
                        <WebReportView
                            results={results}
                            isAnalyzing={isAnalyzing}
                            onAnalyze={handleAnalyze}
                            geminiAnalysis={geminiAnalysis}
                        />

                        {/* 2. PDF Viewer Section */}
                        <div className="w-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <h2 className="text-lg font-bold text-gray-900 mb-6">상세 PDF 리포트 (프리뷰)</h2>

                            <div className="h-[500px] w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                                <PDFViewer width="100%" height="100%" className="border-none">
                                    <AnalysisReportPDF userData={userData} results={results} aiAnalysis={geminiAnalysis} />
                                </PDFViewer>
                            </div>
                        </div>

                        <div className="w-full flex gap-4">
                            <button
                                onClick={handleDownloadStructuredPDF}
                                disabled={isProcessing}
                                className="flex-1 py-4 bg-black text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform cursor-pointer disabled:opacity-50"
                            >
                                <Download className="w-5 h-5" />
                                {isProcessing ? '리포트 생성 중...' : 'PDF 리포트 다운로드'}
                            </button>

                            <button
                                onClick={() => setShowEmailModal(true)}
                                className="flex-1 py-4 bg-white text-black border-2 border-black font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                            >
                                <Share2 className="w-5 h-5" />
                                이메일로 받기
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6 relative overflow-hidden group">
                        {/* Blur Overlay Effect */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"></div>

                        <div className="space-y-2 relative z-0 opacity-50 blur-[2px] select-none pointer-events-none grayscale">
                            <div className="h-64 bg-gray-200 rounded-xl w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>

                        <div className="relative z-20 -mt-20 pb-4">
                            <div className="inline-block p-3 rounded-full bg-gray-900 text-white mb-4 shadow-lg">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">전체 리포트 잠금 해제</h3>
                            <p className="text-gray-500 text-sm mb-8 px-4 leading-relaxed">
                                IAT 상세 반응 분석, 그래프, 그리고 <br />
                                맞춤형 조언이 포함된 5페이지 분량의 PDF를 확인하세요.
                            </p>

                            <button
                                onClick={handlePurchase}
                                disabled={isProcessing}
                                className="w-full py-4 bg-black text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <span className="animate-pulse">결제 처리 중...</span>
                                ) : (
                                    <>
                                        <span>전체 리포트 보기</span>
                                        <span className="px-2 py-0.5 bg-gray-800 rounded-md text-xs text-gray-300">₩3,000</span>
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-[10px] text-gray-400 underline cursor-pointer">서비스 이용약관 및 환불 규정</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Email Modal */}
            {showEmailModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 font-sans-kr">
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm space-y-4 shadow-2xl animate-in zoom-in duration-300">
                        <h3 className="font-bold text-xl text-gray-900">결과를 이메일로 받기</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">이메일 주소를 입력하시면 분석 리포트를 보내드립니다.</p>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setShowEmailModal(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-sm text-gray-600">취소</button>
                            <button onClick={handleSendEmail} className="flex-1 py-4 bg-black text-white rounded-2xl font-bold text-sm">전송하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
