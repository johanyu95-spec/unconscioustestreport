'use client';

// Inline RESULT_PROFILES to prevent ReferenceError B
const RESULT_PROFILES: Record<string, any> = {
    'INTEGRATED_SAGE': {
        "profile_name": "통합된 현자 (The Integrated Sage)",
        "profile_summary": "당신은 페르소나(의식적 자아)와 그림자(무의식적 에너지)가 거의 완벽하게 조화를 이루는 매우 드문 유형입니다. 내적 동기 시스템에 갈등이 없어 목표 추구에 불필요한 에너지를 소모하지 않습니다. 이 조화는 높은 자율성과 삶의 만족도로 이어지며, 당신은 이미 잠재력을 효과적으로 실현하고 있습니다. 현재의 안정과 만족을 바탕으로, 이제 당신의 내적 지혜를 외부 세계의 의미 있는 목표로 확장할 준비가 되어 있습니다.",
        "core_theme": "심리적 전일성과 내적 조화",
        "persona": "자신의 삶에 명확한 목표와 방향성을 가지고 있으며, 환경 관리 및 문제 해결에 대한 유능감과 숙달감을 느낍니다. 모든 기본 심리적 욕구(자율성, 유능감, 관계성)를 의식적으로 충족하고 있습니다.",
        "shadow": "이미 대부분의 잠재력이 의식적으로 통합된 상태로, 억압되거나 부정된 충동이 거의 없습니다. 필요한 경우 즉각적으로 적절한 본능적 반응과 창조적 충동을 활용할 수 있는 심리적 유연성을 가지고 있습니다.",
        "internal_conflict": "갈등 지수(PSCI, MDI)가 매우 낮아, 목표 추구 과정에서 의지력 소모가 최소화됩니다. 내적 에너지(iM)와 의식적 목표(eM)의 방향이 일치하여 심리적 자원이 효율적으로 배분되고 있습니다.",
        "latent_potential": {
            "reframed_shadow": "내적 정체로 이어질 수 있는 '현재의 완벽한 안정성'.",
            "positive_interpretation": "이 안정성은 단순히 안주가 아닌, 새로운, 사회적으로 의미 있는 목적을 탐색하는 데 필요한 **확고한 심리적 기반**입니다. 당신은 심리적 소모 없이 고위험 목표에 도전할 수 있는 힘을 가지고 있습니다.",
            "development_direction": "개인적 만족을 넘어 **외부 사회에 지혜와 통찰을 제공하는 '초월적 목적'**으로 에너지를 투입하여 성장의 의미를 심화해야 합니다."
        },
        "behavioral_tendencies": "높은 지구력과 일관성을 보이며, 고위험 역할에서도 안정적으로 번성할 수 있는 심리적 자본이 풍부합니다. 정서 조절 능력(EQ)이 뛰어나 타인에게 안정감을 줍니다.",
        "risk_of_misalignment": "내적 조화가 외부 세계의 변화에 대한 안주나 저항으로 변질될 위험이 있습니다. 안정적인 상태에 머물러 새로운 도전이나 성장에 대한 기회를 놓칠 수 있습니다."
    },
    'EXHAUSTED_HERO': {
        "profile_name": "소진된 영웅 (The Exhausted Hero)",
        "profile_summary": "당신은 높은 성취 동기와 권력 목표를 의식적으로 추구하는 강력한 에너지를 가졌지만, 이 외적 목표가 내면의 에너지원과 충돌하며 심각한 소진을 겪고 있는 유형입니다. 높은 PSCI가 지속적인 의지력 고갈을 유발하여 웰빙 지수가 가장 낮은 수준으로 측정되었습니다. 당신의 가장 큰 과제는 '성취' 자체보다 '지속 가능한 방식으로 성취하는 방법'에 초점을 맞춘 목표 재설계입니다.",
        "core_theme": "외적 동기와 의지력 고갈",
        "persona": "명시적으로 높은 성취 목표(eAch)와 권력 목표(ePow)를 설정하며, 성공과 타인의 인정, 지위에 집중합니다. 스스로를 유능하고 목표 지향적인 인물로 인식합니다.",
        "shadow": "억압된 부분은 휴식, 자기 돌봄, 그리고 실패에 대한 두려움(Fear of Failure)입니다. 과도한 노력 뒤에 숨겨진 불안, 피로, 그리고 '실패에 대한 굴복을 거부하는 의지'가 무의식에 존재합니다.",
        "internal_conflict": "갈등의 정서적 강도를 나타내는 PSCI(페르소나에 의한 그림자 억압 정도)와 내용적 비효율성을 뜻하는 MDI가 모두 매우 높게 측정되었습니다. 의식적인 성취 목표(eM)와 내재된 에너지(iM) 사이의 큰 방향성 차이가 지속적인 의지력 소모를 유발하고 있습니다.",
        "latent_potential": {
            "reframed_shadow": "성취 강박과 '실패에 대한 굴복을 거부하는 의지'.",
            "positive_interpretation": "이 강한 의지는 외부의 인정 대신 **자신의 내적 기준(iM)**에 맞출 때, **무한한 지구력과 회복 탄력성**으로 발현될 수 있습니다. 당신은 압박 속에서도 노력을 지속하는 놀라운 잠재력을 보유하고 있습니다.",
            "development_direction": "자신의 **내재적 가치**와 **휴식의 필요성**을 통합하여 목표를 재내재화하고, 에너지 고갈을 막는 **자기 돌봄 기술**을 적용해야 합니다."
        },
        "behavioral_tendencies": "목표를 향해 강력하게 돌진하지만, 초기 난이도가 기대치를 초과할 때 심리적 소진을 경험하며, 목표를 미루거나 회피하려는 충동을 느낍니다.",
        "risk_of_misalignment": "외적 목표에 대한 과도한 집착은 심각한 주관적 웰빙 손상 및 신체적 건강 문제로 이어질 수 있습니다. 목표 달성 자체가 아닌, 목표 추구 과정의 비효율성이 가장 큰 리스크입니다."
    },
    'SUPPRESSED_CREATOR': {
        "profile_name": "억압된 창조자 (The Suppressed Creator)",
        "profile_summary": "당신은 내면에 자유롭고 독창적인 창조적 본능(iM)이 살아 숨 쉬고 있지만, 외부의 기대나 의무감(External Control)에 의해 이를 강하게 억누르고 있는 유형입니다. 높은 자율성 욕구(N_Auto)가 좌절되면서 내적 답답함과 무기력을 느낄 수 있습니다. 당신의 과제는 타인의 인정보다는 '나만의 목소리'를 되찾는 것입니다.",
        "core_theme": "자율성 상실과 창조적 억압",
        "persona": "규칙을 준수하고 타인의 기대에 부응하려 노력하는 모범적인 태도를 보입니다. 하지만 이것이 진정한 자신의 모습이 아니라고 느낄 때가 많습니다.",
        "shadow": "무질서해 보일 수 있는 자유로운 충동, 반항심, 그리고 독특한 아이디어들이 무의식 속에 억눌려 있습니다. 이 창조적 에너지는 분출구를 찾지 못해 내적 갈등을 유발합니다.",
        "internal_conflict": "높은 외적 통제 지수(C_External)와 낮은 자율성(N_Auto)이 특징적입니다. 하고 싶은 것과 해야 하는 것 사이의 괴리가 큽니다.",
        "latent_potential": {
            "reframed_shadow": "무모해 보이는 반항심과 엉뚱한 상상력.",
            "positive_interpretation": "이것은 기존의 틀을 깨고 **새로운 가치를 창조할 수 있는 혁신가의 자질**입니다. 억눌린 에너지가 해방될 때 폭발적인 창의성을 발휘할 수 있습니다.",
            "development_direction": "작은 일탈이나 취미를 통해 **자율적인 공간**을 확보하고, 외부 평가와 무관한 **순수한 창작 활동**을 시작해야 합니다."
        },
        "behavioral_tendencies": "겉으로는 순응적이지만 속으로는 비판적인 생각을 하거나, 수동적인 저항(미루기, 딴청 피우기)을 통해 억압된 자율성을 표현하기도 합니다.",
        "risk_of_misalignment": "지속적인 자율성 억압은 우울감이나 급격한 일탈 행동으로 이어질 수 있으며, 자신의 잠재력을 영영 발견하지 못할 위험이 있습니다."
    },
    'WANDERING_EXPLORER': {
        "profile_name": "방황하는 탐험가 (The Wandering Explorer)",
        "profile_summary": "당신은 현재 모든 동기 시스템(iM, eM, PSCI)의 에너지가 평균 이하로 낮게 측정된 상태입니다. 내부에 활성화된 갈등이 거의 없어(MDI 낮음) 심각한 고통은 없지만, 삶의 참여도(Engagement)와 유능감(Competence)이 낮아 주관적 웰빙이 정체되어 있습니다. 당신의 상태는 '무관심(Indifferent)' 프로파일에 가까우며, 지금은 뚜렷한 목표를 정하기보다, 작은 성공 경험을 통해 동력 자체를 활성화하는 과정이 필요합니다.",
        "core_theme": "동기적 무관심과 낮은 참여도 (Indifference)",
        "persona": "자신이 무엇을 원하는지 명확히 인식하지 못하며, 뚜렷한 목표나 방향성이 부족합니다. 삶에 대한 흥미나 재미(Engagement)를 느끼지 못하고, 스스로의 능력에 대한 믿음(Competence)도 낮은 경향을 보입니다.",
        "shadow": "억압된 충동이나 부정적인 에너지가 매우 적습니다. 갈등할 만한 강력한 욕구(iM) 자체가 활성화되어 있지 않아, 에너지가 잠재된 채로 휴면 상태에 가깝습니다.",
        "internal_conflict": "갈등 지수(PSCI, MDI)가 모두 낮습니다. 내적 평온함은 유지되지만, 이는 '해결된 통합'이 아니라 '동력의 부재'로 인한 평온함입니다. 낮은 유능감과 낮은 무의식적 성취욕가 웰빙 저하의 주된 원인입니다.",
        "latent_potential": {
            "reframed_shadow": "삶에 대한 '무관심과 동기적 공백'으로 보이는 현상.",
            "positive_interpretation": "이 무관심은 사실 외부 세계에 대한 **판단이나 고정관념이 없는 '개방적인 탐색 능력'**이며, 다양한 가능성을 수용하고 새로운 영역을 찾을 수 있는 **유연한 태도**입니다.",
            "development_direction": "작은 성공 경험(유능감)을 통해 동력을 구축하고, 내재된 **호기심**을 자극하여 삶의 새로운 영역을 **실질적으로 탐색**하는 행동을 시작해야 합니다."
        },
        "behavioral_tendencies": "새로운 행동을 시작하는 데 어려움을 느끼고, 에너지가 부족하여 목표를 미루는 패턴을 보입니다. 일상생활에서 쉽게 지루함을 느끼고, 도전적인 상황을 회피합니다.",
        "risk_of_misalignment": "지속적인 동력 부재는 삶의 의미(Meaning) 상실과 심리적 정체를 가속화합니다. 명확한 외부 동인 없이는 긍정적인 행동을 시작하기 어렵습니다."
    },
    'OVERLOADED_CAREGIVER': {
        "profile_name": "과부하된 돌보미 (The Overloaded Caregiver)",
        "profile_summary": "당신은 타인과의 따뜻하고 친밀한 연결(Affiliation)에 대한 무의식적 에너지(iM)가 매우 강력하지만, 이 강력한 친화 에너지가 타인의 욕구에 과도하게 투사되면서, 자신의 주도권(자율성)을 상실하는 갈등을 겪고 있습니다. 이로 인해 관계적 소진을 경험하고 웰빙이 저하되었습니다. 당신의 과제는 헌신적인 돌봄의 에너지를 '나 자신'에게도 투자하여 건강한 경계를 세우는 것입니다.",
        "core_theme": "관계적 소진과 자율성 침해",
        "persona": "타인을 돕고, 지지하며, 관계의 조화와 평온함을 중요시합니다. 스스로를 이타적이고 공감 능력(Empathy)이 높은 인물로 인식하며, 이로 인해 타인의 부탁을 거절하기 어려워합니다.",
        "shadow": "억압된 그림자는 '자신의 필요에 대한 무시'와 '희생에 대한 보상 심리'이며, 관계를 유지하지 못할까 봐 두려워하는 '거절 공포(Fear of Rejection)'가 무의식에 잠재되어 있습니다.",
        "internal_conflict": "매우 높은 내적 친화 동기가 타인의 요구를 수용하는 페르소나와 불일치하며, 자율성 욕구가 심각하게 좌절됩니다. 이 갈등은 관계적 소진(피로도)을 유발하며, 자신의 필요를 충족시키지 못하는 데서 오는 분노를 야기합니다.",
        "latent_potential": {
            "reframed_shadow": "타인을 향한 과도한 헌신 뒤에 숨겨진 '자신의 필요에 대한 무시'와 '희생에 대한 보상 심리'.",
            "positive_interpretation": "이 강력한 내적 친화 동기는 관계의 깊이를 창조하는 힘이며, **경계를 설정**할 때 **타인을 진정으로 존중하는 리더십(Caregiver Archetype)**으로 승화됩니다. 당신의 공감 능력은 소진되지 않으면서도 관계를 유지할 수 있는 기반입니다.",
            "development_direction": "**자기 연민(Self-Compassion)**을 실천하고, **건강한 경계 설정(Boundary Setting)**을 통해 헌신의 에너지를 효율적으로 관리하여 자율성을 확보해야 합니다."
        },
        "behavioral_tendencies": "거절을 회피하고, 다른 사람의 감정에 지나치게 휘둘려 자신의 일정을 희생하는 경향이 있습니다. 갈등 상황에서는 자신의 요구를 주장하기보다 침묵합니다.",
        "risk_of_misalignment": "자율성 좌절은 장기적인 관계적 좌절(Relatedness Frustration)로 이어져, 궁극적으로 관계를 단절시키거나 소진으로 인한 웰빙 손상을 초래합니다."
    },
    'DORMANT_RULER': {
        "profile_name": "야망을 숨긴 통치자 (The Dormant Ruler)",
        "profile_summary": "당신은 조직이나 환경에 영향력을 행사하고 통제하려는 무의식적인 권력 동기가 매우 강하지만, 의식적으로는 이러한 목표(명시적 권력 동기)를 부인하거나 회피하는 유형입니다. 무의식적인 권력 동기와 의식적인 권력 동기의 차이가 극도로 높아 에너지의 비효율성이 가장 크지만, 그림자 억압 지수 낮아 정서적 억압 수준은 낮습니다. 당신의 과제는 숨겨진 '통치자(Ruler)'의 에너지를 부정적인 야망이 아닌, 팀이나 조직을 발전시키는 **책임감 있는 리더십**으로 통합하는 것입니다.",
        "core_theme": "잠재된 권력 동기의 부인 및 비효율",
        "persona": "자신이 '튀지 않고', '팀에 협력적'이라고 인식하며, 리더십이나 영향력을 행사하는 역할을 의식적으로 피합니다. 타인의 의견을 잘 듣고 수용하는 모습을 보입니다.",
        "shadow": "매우 강력한 통제 욕구, 경쟁심, 그리고 조직 내에서 주도적인 역할을 하려는 충동입니다. 이 그림자는 잠재적인 '유능한 리더'의 모습이며, 이 에너지를 건설적으로 활용하면 높은 성과를 얻을 수 있습니다.",
        "internal_conflict": "내면의 통제 충동(iM)과 의식적 목표(eM) 사이에 큰 방향성 차이(MDI)가 존재하여 에너지 비효율이 발생하고 있습니다. 하지만 페르소나에 의한 그림자 억압 정도(PSCI)는 상대적으로 낮아 심각한 정서적 고통보다는 잠재력을 충분히 활용하지 못하는 답답함이 핵심입니다.",
        "latent_potential": {
            "reframed_shadow": "의식적으로 부인하는 '타인에게 영향력을 행사하고 통제하려는 강한 욕구'.",
            "positive_interpretation": "이 강력한 암묵적 권력 동기는 **조직을 이끌고 긍정적인 변화를 창출하는 책임감 있는 리더십**의 원동력입니다. 이는 단순한 이기심이 아닌 **사회적 기여**의 잠재력이며, 리더십 교육에서 가장 큰 효과를 볼 수 있습니다.",
            "development_direction": "자신의 **영향력 욕구**를 인정하고, 이를 긍정적인 목표에 **책임감 있게 투사**하여 **리더의 자율성**을 발휘해야 합니다."
        },
        "behavioral_tendencies": "회의에서 중요한 순간 발언을 주저하거나, 자신의 의견이 비판받을 때 쉽게 포기하는 경향이 있습니다. 목표를 향해 노력하지만, 그 목표가 자신의 내적 동기와 충돌하여 만족도가 낮습니다.",
        "risk_of_misalignment": "내적 에너지(iM)와 목표 방향(eM)의 지속적인 불일치는 목표 달성 자체의 비효율성을 초래하며, 리더십 잠재력을 완전히 발휘하지 못하고 좌절될 위험이 큽니다."
    },
    'CONFLICTED_LOVER': {
        "profile_name": "갈등하는 연인 (The Conflicted Lover)",
        "profile_summary": "당신은 타인과 깊고 따뜻한 연결(Affiliation)을 갈망하지만, 무의식 깊은 곳에는 강한 거절 공포(Fear of Rejection)가 자리하고 있는 유형입니다. 이 두 힘의 충돌(PSCI 높음)이 관계적 불안정성을 유발하며, 관계를 추구할수록 심리적 소진과 웰빙 저하를 경험합니다. 당신의 과제는 관계를 '완벽하게' 유지하려는 환상을 버리고, **건강한 정서 조절 능력**을 길러 불안정성을 포용하는 것입니다.",
        "core_theme": "거절 공포와 관계적 불안정성",
        "persona": "타인과 조화롭고, 따뜻하며, 친밀한 관계를 맺기를 원합니다. 스스로를 공감 능력이 뛰어난 '연인(Lover) 아키타입'으로 인식합니다.",
        "shadow": "관계 속에서의 불안감, 거절당할 것에 대한 민감한 공포(Fear of Rejection), 그리고 관계 갈등 시 자기 주장 능력을 상실하는 회피 성향이 무의식에 숨겨져 있습니다.",
        "internal_conflict": "높은 그림자 억압과 내적 동기 괴리 패턴을 보이며, 이는 관계를 향한 희망(HA)과 거절에 대한 공포(FR)가 격렬하게 충돌하고 있음을 의미합니다. 이 정서적 갈등은 행복감 수준을 낮추는 주된 원인입니다.",
        "latent_potential": {
            "reframed_shadow": "관계에 대한 불안정성과 '거절당할 것에 대한 극단적인 민감성'.",
            "positive_interpretation": "이 민감성은 타인의 감정에 대한 **놀라운 공감 능력**과 **관계의 깊이를 추구하는 진정성**입니다. 이 에너지를 통해 **더 깊고 의미 있는 관계**를 형성하고, **정서 조절($EQ$)** 능력을 향상시킬 수 있습니다.",
            "development_direction": "**정서 조절(Emotion Regulation)** 기술을 습득하고, 그림자 억압으로 측정된 불안에 대해 **인지적 재평가**를 훈련하여 관계적 회복 탄력성을 높여야 합니다."
        },
        "behavioral_tendencies": "대화 시 상대방의 기분에 과도하게 민감하며, 관계 갈등 상황이 발생하면 문제를 해결하기보다 회피하거나 자신의 감정을 억누르는 경향이 있습니다.",
        "risk_of_misalignment": "거절 공포(FR)가 관계 추구를 방해하거나, 관계를 유지하기 위해 과도하게 자기 희생을 하여 웰빙을 지속적으로 손상시킬 위험이 있습니다."
    }
};
import { BarChart3, AlertCircle, Sparkles, BrainCircuit } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';

import OverlapCircleComponent from './OverlapCircleComponent';
import HorizontalBarChartComponent from './HorizontalBarChartComponent';

interface WebReportViewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: any;
    isAnalyzing?: boolean;
    onAnalyze?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geminiAnalysis?: any; // Now expects the full profile object if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    radarData?: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    barData?: any[];
}

export default function WebReportView({
    results,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isAnalyzing = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAnalyze,
    geminiAnalysis,
    radarData,
    barData
}: WebReportViewProps) {
    const paima = results.paima || {};
    const profileKey = paima.profileKey || 'WANDERING_EXPLORER';

    // Use Gemini Generated Profile if available, otherwise static
    // Use Gemini Generated Profile if available, otherwise static
    const safeResultProfiles = RESULT_PROFILES || {};
    const fallbackProfile = safeResultProfiles['WANDERING_EXPLORER'] || {
        profile_name: '분석 중...',
        profile_summary: '데이터를 불러오는 중입니다.',
        core_theme: '',
        persona: '',
        shadow: '',
        internal_conflict: '',
        latent_potential: { reframed_shadow: '', positive_interpretation: '', development_direction: '' },
        behavioral_tendencies: '',
        risk_of_misalignment: ''
    };

    const mergedProfile = geminiAnalysis ? { ...safeResultProfiles[profileKey], ...geminiAnalysis } : (safeResultProfiles[profileKey] || fallbackProfile);
    const profile = mergedProfile;

    // Helper for Z-score formatting
    const getLevel = (z: number) => {
        if (z >= 1.0) return { label: '높음', color: 'text-blue-700', bg: 'bg-blue-600' };
        if (z <= -1.0) return { label: '낮음', color: 'text-red-700', bg: 'bg-red-600' };
        return { label: '평균', color: 'text-gray-600', bg: 'bg-gray-400' };
    };

    const getWidth = (z: number) => {
        // Map -2~2 to 0~100%
        const val = Math.min(Math.max((z * 20) + 50, 5), 95);
        return `${val}%`;
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Overlap Circle Section (Moved to Top) */}
            {radarData && (
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-4">
                            <BrainCircuit className="w-5 h-5 text-gray-500" />
                            <h3 className="font-bold text-gray-900">무의식(내면) vs 의식(가면) 관계성</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                            <span className="font-bold text-slate-800">검은 원(그림자)</span>과 <span className="font-bold text-purple-400">밝은 원(페르소나)</span>의 거리를 확인하세요.<br />
                            두 원이 <span className="font-bold text-blue-600">완전히 겹칠수록</span> 진정한 자아실현에 가까운 상태입니다.
                        </p>
                        <OverlapCircleComponent data={radarData} psci={paima.Z_PSCI} />
                    </div>
                </div>
            )}

            {/* 2. Profile Header Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-blue-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-4 border border-blue-100">
                        <Sparkles className="w-3 h-3" />
                        Analysis Result
                    </div>

                    <h2 className="text-sm font-bold text-gray-500 mb-1">당신의 무의식 페르소나</h2>
                    <h1 className="text-3xl font-black font-serif-kr text-gray-900 leading-tight mb-4">
                        {profile.profile_name}
                    </h1>

                    <p className="text-base text-gray-700 leading-relaxed font-medium">
                        {profile.profile_summary}
                    </p>
                </div>
            </div>




            {/* 2. Key Metrics & Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Needs Satisfaction (Manual Bars - Keep as clean simple bars) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-gray-500" />
                        <h3 className="font-bold text-gray-900">기본 심리 욕구 충족도</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: '자율성 (Autonomy)', z: paima.Z_N_Auto, desc: '주도적인 삶' },
                            { label: '유능감 (Competence)', z: paima.Z_N_Comp, desc: '성취와 효율' },
                            { label: '관계성 (Relatedness)', z: paima.Z_N_Rela, desc: '연결과 소속' }
                        ].map((item, idx) => {
                            const level = getLevel(item.z || 0);
                            return (
                                <div key={idx}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-bold text-gray-700">{item.label}</span>
                                        <span className={`font-bold ${level.color}`}>{item.desc} : {level.label}</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${level.bg}`}
                                            style={{ width: getWidth(item.z || 0) }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Conflict & Energy (Horizontal Bar Chart) */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertCircle className="w-5 h-5 text-gray-500" />
                        <h3 className="font-bold text-gray-900">내면 갈등과 에너지 누수</h3>
                    </div>
                    {barData ? (
                        <HorizontalBarChartComponent data={barData} />
                    ) : (
                        <p>No Data</p>
                    )}
                </div>
            </div>



        </div>
    );
}
