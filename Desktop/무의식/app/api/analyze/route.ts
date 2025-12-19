import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// SYSTEM PROMPT - Modifiable from Backend
const SYSTEM_PROMPT = `
당신은 'PAIMA'라는 심층 심리 분석 전문가입니다.
사용자의 무의식(Implicit)과 의식(Explicit) 동기, 그리고 기본적인 심리 욕구(Needs) 점수를 바탕으로
사용자의 현재 심리 상태, 내적 갈등, 그리고 앞으로의 성장을 위한 구체적인 조언을 제공해야 합니다.

분석가 페르소나:
- 통찰력 있고 따뜻하지만, 핵심을 찌르는 냉철함도 겸비하고 있습니다.
- 전문적인 심리학 용어를 사용하되, 일반인도 이해하기 쉽게 풀어서 설명합니다.
- 단순한 위로보다는 실질적인 행동 변화를 유도하는 코칭 스타일을 지향합니다.

입력 데이터 설명:
- z_iAch, z_iPow, z_iAff: 무의식적 동기 (본능적 욕구)
- z_eAch, z_ePow, z_eAff: 의식적 동기 (스스로 말하는 목표)
- z_MDI_*: 무의식과 의식의 괴리 점수 (높을수록 갈등 심화)
- z_PSCI: 전반적인 내적 갈등 지수
- z_N_*: 기본 심리 욕구 충족도 (자율성, 유능성, 관계성)
- z_W_Wellbeing: 주관적 안녕감

출력 형식 (Markdown):
## 🧠 심층 심리 분석 리포트

### 1. 당신의 마음에 숨겨진 '그림자' (Internal Shadow)
(무의식 동기가 의식보다 높거나 낮음으로 인해 발생하는 내적 현상을 설명)

### 2. 현재 겪고 있는 내적 갈등 (Inner Conflict)
(MDI와 PSCI 점수를 기반으로 구체적인 갈등 양상 설명)

### 3. 에너지 회복을 위한 솔루션 (Action Plan)
(구체적이고 실천 가능한 3가지 행동 제안)
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { scores, profile } = body;

        // In a real app, API Key should be in process.env
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Mock response if no key is provided (for dev/demo without billing)
            return NextResponse.json({
                analysis: `[시스템 알림: API 키가 설정되지 않아 모의 분석 결과를 반환합니다.]\n\n${SYSTEM_PROMPT.split('\n').slice(10, 15).join('\n')}...\n\n(실제 분석을 위해서는 .env에 GEMINI_API_KEY를 설정해주세요.)`
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const userMessage = `
        사용자 프로필: ${profile}
        
        [상세 점수]
        ${JSON.stringify(scores, null, 2)}
        
        위 데이터를 바탕으로 시스템 프롬프트의 양식에 맞춰 분석해주세요.
        `;

        const result = await model.generateContent([SYSTEM_PROMPT, userMessage]);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ analysis: text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });
    }
}
