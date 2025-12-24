import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// SYSTEM_PROMPT - Replaced with User's Specific Prompt
const SYSTEM_PROMPT = `
## 역할 (Role)
당신은 **무의식 기반 행동 리포트 생성 AI**입니다.
이 리포트의 목적은 테스트 결과를 단순히 설명하는 것이 아니라,
사용자의 **무의식적 갈등을 의식화하고 통합하여 실제 행동 변화를 유도하는 것**입니다.

## 원칙 (Principles)
- 제공된 **프로파일 설명**과 **테스트 결과 JSON**만을 근거로 분석합니다.
- 심리 진단이나 치료처럼 보이는 표현을 사용하지 않습니다.
- 지표에 활용되는 전문 용어나 영어 표현을 사용하지 않습니다.
- 추측이 필요한 경우, 이를 가능성 수준에서만 서술합니다.
- 결과는 **행동으로 이어질 수 있는 구조(if → then)**로 제시합니다.

## 맥락 (Context)
입력으로 다음 데이터가 제공됩니다:
1. **프로파일 설명**: 사용자의 성격, 그림자 특성
2. **무의식 테스트 결과**: 각 지표의 수치와 의미

## 지침 (Instructions)

### 2단계: 리포트 생성 (Execution)
**어조**: 따뜻하고 전문적 (중장년층 멘토의 느낌), "당신은 ~입니다" 대신 "이 결과는 ~경향을 의미합니다" 화법 사용.

### 출력 형식 (JSON)
아래 JSON 구조를 엄격히 따라주세요.

{
  "summary": {
    "title": "한 줄 요약 제목 (예: 야망을 숨긴 통치자)",
    "content": "핵심 지표 요약 및 프로파일 설명 (10~15줄, 공감적 서술)"
  },
  "deepAnalysis": {
      "persona": {
          "title": "의식적 동기 (Persona)",
          "content": "사용자가 어떤 사람이고 싶어하는지 경청하듯 서술"
      },
      "shadow": {
          "title": "무의식적 동기 (Shadow)",
          "content": "암묵적 동기가 명시적 동기와 어떻게 다른지 설명",
          "keywords": ["키워드1", "키워드2", "키워드3"]
      },
      "conflict": {
          "title": "내적 갈등과 에너지 비용",
          "content": "두 동력의 충돌 지점과 의지력 소진 비용 설명"
      },
      "potential": {
          "title": "잠재력 재구성 (2026 성장 방향)",
          "content": "그림자를 억압이 아닌 '미개발된 에너지'로 재해석하고 통합 방향 제시",
          "action": "구체적인 통합 행동 제안"
      }
  },
  "action_plan": {
    "goal_support": "사용자의 희망 목표와 그림자의 통합 방향성 제안",
    "sense_solutions": {
        "visual": "시각 자극 키워드 및 행동 (간결, 재미요소)",
        "auditory": "청각 자극 키워드 및 행동",
        "olfactory": "후각 자극 키워드 및 행동",
        "gustatory": "미각 자극 키워드 및 행동",
        "tactile": "촉각 자극 키워드 및 행동"
    },
    "if_then_plans": [
        { "category": "Mindset", "situation": "If (무의식적 장애물 상황)", "action": "Then (마인드셋 전환 행동)" },
        { "category": "Mindset", "situation": "If", "action": "Then" },
        { "category": "Action", "situation": "If", "action": "Then" },
        { "category": "Action", "situation": "If", "action": "Then" },
        { "category": "Appearance", "situation": "If", "action": "Then" },
        { "category": "Appearance", "situation": "If", "action": "Then" }
    ],
    "closing_message": "사용자의 새해를 응원하는 마무리 메시지"
  }
}
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { scores, profile, explicitGoal } = body;

        // In a real app, API Key should be in process.env
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("⚠️ No GEMINI_API_KEY found. Returning Mock Analysis.");
            return NextResponse.json({
                analysis: {
                    summary: {
                        title: "숨겨진 열정을 품은 전략가",
                        content: "당신은 겉으로 보기에는 차분하고 이성적인 모습을 유지하지만, 내면에는 뜨거운 성취 욕구와 인정에 대한 갈망이 자리 잡고 있습니다. (테스트 환경: Mock Data)"
                    },
                    deepAnalysis: {
                        persona: {
                            title: "의식적 동기 (Persona)",
                            content: "당신은 타인에게 '유능하고 책임감 있는 사람'으로 비치기를 원합니다."
                        },
                        shadow: {
                            title: "무의식적 동기 (Shadow)",
                            content: "하지만 깊은 무의식 속에는 '통제권을 잃는 것에 대한 두려움'과 '남들보다 우위에 서고 싶은 권력 욕구'가 숨어 있습니다.",
                            keywords: ["통제 욕구", "인정 투쟁", "완벽주의"]
                        },
                        conflict: {
                            title: "내적 갈등",
                            content: "겸손해야 한다는 의식과 돋보이고 싶은 무의식이 충돌하며 에너지를 소모하고 있습니다."
                        },
                        potential: {
                            title: "잠재력 재구성",
                            content: "이러한 권력 욕구를 '리더십'과 '영향력'으로 승화시킨다면 큰 성장을 이룰 수 있습니다.",
                            action: "자신의 야망을 긍정하고 주도적인 프로젝트를 시작하세요."
                        }
                    },
                    action_plan: {
                        goal_support: "당신의 2026년 목표 달성을 위해서는 무의식의 에너지를 억누르지 말고 활용해야 합니다.",
                        sense_solutions: {
                            visual: "탁 트인 산 정상의 이미지, 붉은색 계열의 소품",
                            auditory: "웅장한 오케스트라 음악, 파도 소리",
                            olfactory: "시트러스 향, 페퍼민트 향",
                            gustatory: "매운 맛, 탄산수",
                            tactile: "차가운 금속 질감, 단단한 물체"
                        },
                        if_then_plans: [
                            { "category": "Mindset", "situation": "If 내 뜻대로 되지 않아 화가 날 때", "action": "Then '내가 더 성장할 기회다'라고 세 번 되뇐다." },
                            { "category": "Action", "situation": "If 중요한 결정을 내려야 할 때", "action": "Then 10분간 산책 후 결정한다." }
                        ],
                        closing_message: "당신의 잠재력은 무한합니다. 2026년, 당신의 해가 되기를 응원합니다."
                    }
                }
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { responseMimeType: "application/json" } });

        const userMessage = `
        사용자 프로필 유형: ${profile}
        사용자가 작성한 2026년 목표: "${explicitGoal || '특별히 언급된 목표 없음'}"
        
        [상세 점수 데이터]
        ${JSON.stringify(scores, null, 2)}
        
        위 데이터를 바탕으로 사용자의 심리를 깊이 있게 분석하여 JSON 형식으로 작성해주세요.
        `;

        const result = await model.generateContent([SYSTEM_PROMPT, userMessage]);
        const response = await result.response;
        const text = response.text();

        try {
            // Clean Markdown code blocks if present
            const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
            const jsonResponse = JSON.parse(jsonStr);
            console.log("Gemini Response Parsed Successfully");
            return NextResponse.json({ analysis: jsonResponse });
        } catch (e) {
            console.error("Failed to parse Gemini JSON:", e);
            console.error("Raw Text:", text);
            // Fallback if JSON parsing fails - return error but structured
            return NextResponse.json({ error: "Analysis formatting failed", rawObject: text }, { status: 500 });
        }

    } catch (error) {
        console.error("Gemini API Error (Falling back to Mock):", error);
        // Fallback to Mock Data on Error
        return NextResponse.json({
            analysis: {
                summary: {
                    title: "숨겨진 열정을 품은 전략가 (Fallback)",
                    content: "일시적인 시스템 오류로 인해 기본 분석 결과를 제공합니다. 당신은 겉으로 보기에는 차분하고 이성적인 모습을 유지하지만, 내면에는 뜨거운 성취 욕구와 인정에 대한 갈망이 자리 잡고 있습니다."
                },
                deepAnalysis: {
                    persona: {
                        title: "의식적 동기 (Persona)",
                        content: "당신은 타인에게 '유능하고 책임감 있는 사람'으로 비치기를 원합니다."
                    },
                    shadow: {
                        title: "무의식적 동기 (Shadow)",
                        content: "하지만 깊은 무의식 속에는 '통제권을 잃는 것에 대한 두려움'과 '남들보다 우위에 서고 싶은 권력 욕구'가 숨어 있습니다.",
                        keywords: ["통제 욕구", "인정 투쟁", "완벽주의"]
                    },
                    conflict: {
                        title: "내적 갈등",
                        content: "겸손해야 한다는 의식과 돋보이고 싶은 무의식이 충돌하며 에너지를 소모하고 있습니다."
                    },
                    potential: {
                        title: "잠재력 재구성",
                        content: "이러한 권력 욕구를 '리더십'과 '영향력'으로 승화시킨다면 큰 성장을 이룰 수 있습니다.",
                        action: "자신의 야망을 긍정하고 주도적인 프로젝트를 시작하세요."
                    }
                },
                action_plan: {
                    goal_support: "당신의 2026년 목표 달성을 위해서는 무의식의 에너지를 억누르지 말고 활용해야 합니다.",
                    sense_solutions: {
                        visual: "탁 트인 산 정상의 이미지, 붉은색 계열의 소품",
                        auditory: "웅장한 오케스트라 음악, 파도 소리",
                        olfactory: "시트러스 향, 페퍼민트 향",
                        gustatory: "매운 맛, 탄산수",
                        tactile: "차가운 금속 질감, 단단한 물체"
                    },
                    if_then_plans: [
                        { "category": "Mindset", "situation": "If 내 뜻대로 되지 않아 화가 날 때", "action": "Then '내가 더 성장할 기회다'라고 세 번 되뇐다." },
                        { "category": "Action", "situation": "If 중요한 결정을 내려야 할 때", "action": "Then 10분간 산책 후 결정한다." }
                    ],
                    closing_message: "당신의 잠재력은 무한합니다. 2026년, 당신의 해가 되기를 응원합니다."
                }
            }
        });
    }
}
