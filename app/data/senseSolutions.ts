export interface SenseSolutionItem {
    id: string;
    title: string;
    description: string;
    type: 'visual' | 'auditory' | 'smell' | 'taste' | 'touch';
    tags: string[]; // e.g., 'HIGH_POWER', 'LOW_ENERGY', 'HIGH_ANXIETY', 'HIGH_ACHIEVEMENT', 'HIGH_AFFILIATION'
    image?: string;
    keywords: string[];
}

export const SENSE_SOLUTIONS: SenseSolutionItem[] = [
    // --- VISUAL (시각) ---
    {
        id: "v1",
        title: "광활한 대지의 풍경",
        description: "끝없이 펼쳐진 평원이나 사막의 이미지는 당신의 답답한 마음을 해방시키고 넓은 시야를 제공합니다.",
        type: "visual",
        tags: ["HIGH_POWER", "HIGH_ACHIEVEMENT", "STRESS"],
        keywords: ["Grand", "Open", "Freedom"],
        image: "/images/sense/visual_desert.jpg"
    },
    {
        id: "v2",
        title: "질서 정연한 건축물",
        description: "대칭적이고 구조가 확실한 건축 사진은 당신의 복잡한 머릿속을 정리하고 통제감을 되찾게 해줍니다.",
        type: "visual",
        tags: ["HIGH_POWER", "LOW_CONTROL"],
        keywords: ["Structure", "Order", "Control"],
        image: "/images/sense/visual_architecture.jpg"
    },
    {
        id: "v3",
        title: "따뜻한 모닥불 불꽃",
        description: "타오르는 불꽃의 일렁임은 당신의 불안한 마음을 태워버리고 원초적인 안정감을 줍니다.",
        type: "visual",
        tags: ["HIGH_AFFILIATION", "ANXIETY", "DEPRESSION"],
        keywords: ["Warmth", "Fire", "Comfort"],
        image: "/images/sense/visual_fire.jpg"
    },
    {
        id: "v4",
        title: "깊고 푸른 심해",
        description: "고요하고 깊은 바다의 이미지는 들뜬 에너지를 차분하게 가라앉히고 내면으로 침잠하게 돕습니다.",
        type: "visual",
        tags: ["HIGH_ENERGY", "HIGH_ACHIEVEMENT", "BURN_OUT"],
        keywords: ["Deep", "Ocean", "Calm"],
        image: "/images/sense/visual_deepsea.jpg"
    },
    {
        id: "v5",
        title: "활기찬 시장의 색감",
        description: "다채로운 색상의 과일과 활기찬 시장 풍경은 우울한 기분을 전환하고 생명력을 불어넣습니다.",
        type: "visual",
        tags: ["LOW_ENERGY", "DEPRESSION"],
        keywords: ["Vibrant", "Color", "Life"],
        image: "/images/sense/visual_market.jpg"
    },
    {
        id: "v6",
        title: "미니멀리즘 아트",
        description: "복잡한 요소가 제거된 단순한 점, 선, 면의 그림은 과부하된 뇌에 휴식을 줍니다.",
        type: "visual",
        tags: ["HIGH_STRESS", "OVERTHINKING"],
        keywords: ["Simple", "Minimal", "Rest"],
        image: "/images/sense/visual_minimal.jpg"
    },
    {
        id: "v7",
        title: "높은 산 정상의 뷰",
        description: "산을 내려다보는 시점의 사진은 당신의 정복 욕구를 대리 만족시키고 포부를 높여줍니다.",
        type: "visual",
        tags: ["HIGH_POWER", "HIGH_ACHIEVEMENT"],
        keywords: ["Peak", "View", "Ambition"],
        image: "/images/sense/visual_mountain.jpg"
    },
    {
        id: "v8",
        title: "강아지와 아이들의 미소",
        description: "순수한 존재들의 행복한 표정은 당신의 경계심을 허물고 옥시토신 분비를 돕습니다.",
        type: "visual",
        tags: ["HIGH_AFFILIATION", "LONELINESS"],
        keywords: ["Pure", "Smile", "Connection"],
        image: "/images/sense/visual_smile.jpg"
    },
    {
        id: "v9",
        title: "골드 & 블랙 인테리어",
        description: "고급스러운 골드와 무게감 있는 블랙의 조화는 당신의 자존감을 높이고 성공의 이미지를 심어줍니다.",
        type: "visual",
        tags: ["HIGH_POWER", "LOW_SELF_ESTEEM"],
        keywords: ["Luxury", "Gold", "Confidence"],
        image: "/images/sense/visual_gold.jpg"
    },
    {
        id: "v10",
        title: "새벽의 안개 낀 숲",
        description: "신비롭고 차분한 숲의 이미지는 예민해진 신경을 이완시키고 몽상적인 휴식을 제공합니다.",
        type: "visual",
        tags: ["HIGH_SENSITIVITY", "ANXIETY"],
        keywords: ["Mystic", "Forest", "Relax"],
        image: "/images/sense/visual_forest.jpg"
    },

    // --- AUDITORY (청각) ---
    {
        id: "a1",
        title: "저음의 첼로 독주",
        description: "묵직하게 깔리는 첼로의 선율은 붕 뜬 마음을 그라운딩(Grounding) 시키는 데 탁월합니다.",
        type: "auditory",
        tags: ["HIGH_ANXIETY", "HIGH_ENERGY"],
        keywords: ["Cello", "Low", "Grounding"],
        image: "/images/sense/sound_cello.jpg"
    },
    {
        id: "a2",
        title: "백색 소음 (비행기 기내음)",
        description: "일정한 주파수의 기계음은 잡념을 차단하고 업무 집중도를 극대화합니다.",
        type: "auditory",
        tags: ["HIGH_ACHIEVEMENT", "DISTRACTION"],
        keywords: ["WhiteNoise", "Focus", "Block"],
        image: "/images/sense/sound_airplane.jpg"
    },
    {
        id: "a3",
        title: "장작 타는 소리 (ASMR)",
        description: "타닥타닥 타오르는 장작 소리는 원시적인 편안함을 주며 외로움을 달래줍니다.",
        type: "auditory",
        tags: ["HIGH_AFFILIATION", "insomnia"],
        keywords: ["Fire", "Crackling", "Comfort"],
        image: "/images/sense/sound_fire.jpg"
    },
    {
        id: "a4",
        title: "웅장한 오케스트라 행진곡",
        description: "심장을 울리는 웅장한 클래식은 당신의 지배 욕구와 자신감을 고취시킵니다.",
        type: "auditory",
        tags: ["HIGH_POWER", "LOW_CONFIDENCE"],
        keywords: ["Orchestra", "Grand", "Confidence"],
        image: "/images/sense/sound_orchestra.jpg"
    },
    {
        id: "a5",
        title: "시냇물 흐르는 소리",
        description: "졸졸 흐르는 맑은 물소리는 막힌감정을 씻어내고 정신을 맑게 합니다.",
        type: "auditory",
        tags: ["STRESS", "ANGER"],
        keywords: ["Water", "Flow", "Cleanse"],
        image: "/images/sense/sound_stream.jpg"
    },
    {
        id: "a6",
        title: "재즈 카페의 소음",
        description: "적당한 사람들의 대화 소리와 재즈 음악은 고립감을 해소하고 창의력을 자극합니다.",
        type: "auditory",
        tags: ["HIGH_AFFILIATION", "BOREDOM"],
        keywords: ["Jazz", "Cafe", "Social"],
        image: "/images/sense/sound_jazz.jpg"
    },
    {
        id: "a7",
        title: "빠른 템포의 EDM",
        description: "강렬한 비트의 음악은 무기력한 신체를 깨우고 에너지를 즉각적으로 끌어올립니다.",
        type: "auditory",
        tags: ["LOW_ENERGY", "DEPRESSION"],
        keywords: ["Beat", "Energy", "WakeUp"],
        image: "/images/sense/sound_edm.jpg"
    },
    {
        id: "a8",
        title: "절의 풍경(바람) 소리",
        description: "간헐적으로 들리는 맑은 종소리는 과도한 생각을 멈추고 현재에 집중하게 합니다.",
        type: "auditory",
        tags: ["OVERTHINKING", "ANXIETY"],
        keywords: ["WindChime", "Clear", "Present"],
        image: "/images/sense/sound_chime.jpg"
    },
    {
        id: "a9",
        title: "타자기 타이핑 소리",
        description: "규칙적인 타건음은 당신의 성취 욕구를 자극하고 '일하고 있음'을 감각적으로 확인시켜줍니다.",
        type: "auditory",
        tags: ["HIGH_ACHIEVEMENT", "LAZINESS"],
        keywords: ["Typing", "Work", "Rhythm"],
        image: "/images/sense/sound_typing.jpg"
    },
    {
        id: "a10",
        title: "고래의 울음소리",
        description: "신비롭고 낮은 고래 소리는 깊은 무의식과 연결되는 듯한 명상적인 체험을 제공합니다.",
        type: "auditory",
        tags: ["HIGH_SENSITIVITY", "MEDITATION"],
        keywords: ["Whale", "Mystic", "Deep"],
        image: "/images/sense/sound_whale.jpg"
    },

    // --- OLFACTORY (후각) ---
    {
        id: "s1",
        title: "시더우드 & 샌달우드",
        description: "오래된 나무 향은 당신에게 흔들리지 않는 뿌리와 같은 안정감과 권위를 부여합니다.",
        type: "smell",
        tags: ["HIGH_POWER", "ANXIETY"],
        keywords: ["Woody", "Stable", "Authority"],
        image: "/images/sense/scent_wood.jpg"
    },
    {
        id: "s2",
        title: "페퍼민트 & 유칼립투스",
        description: "코를 뚫는 시원한 향은 뇌를 각성시키고 논리적인 사고를 돕습니다.",
        type: "smell",
        tags: ["HIGH_ACHIEVEMENT", "DROWSINESS"],
        keywords: ["Mint", "Focus", "Awake"],
        image: "/images/sense/scent_mint.jpg"
    },
    {
        id: "s3",
        title: "바닐라 & 코코넛",
        description: "달콤하고 부드러운 향기는 모성애적인 안정감을 주며 외로움을 달래줍니다.",
        type: "smell",
        tags: ["HIGH_AFFILIATION", "LONELINESS"],
        keywords: ["Sweet", "Warm", "Comfort"],
        image: "/images/sense/scent_vanilla.jpg"
    },
    {
        id: "s4",
        title: "시트러스 (레몬/오렌지)",
        description: "상큼한 감귤계 향은 우울감을 즉각적으로 개선하고 기분을 리프레시합니다.",
        type: "smell",
        tags: ["DEPRESSION", "LOW_ENERGY"],
        keywords: ["Citrus", "Fresh", "Joy"],
        image: "/images/sense/scent_citrus.jpg"
    },
    {
        id: "s5",
        title: "가죽 (Leather) 향",
        description: "고급스러운 가죽 냄새는 당신의 지배력과 성공에 대한 감각을 자극합니다.",
        type: "smell",
        tags: ["HIGH_POWER", "LOW_CONFIDENCE"],
        keywords: ["Leather", "Luxury", "Dominance"],
        image: "/images/sense/scent_leather.jpg"
    },
    {
        id: "s6",
        title: "라벤더",
        description: "대표적인 이완 향기인 라벤더는 불면증과 고조된 신경을 진정시킵니다.",
        type: "smell",
        tags: ["HIGH_STRESS", "INSOMNIA"],
        keywords: ["Lavender", "Sleep", "Relax"],
        image: "/images/sense/scent_lavender.jpg"
    },
    {
        id: "s7",
        title: "비 온 뒤 흙내음 (Petrichor)",
        description: "젖은 흙 냄새는 차분함을 주고 자연으로 돌아간 듯한 리셋 감각을 줍니다.",
        type: "smell",
        tags: ["BURNOUT", "OVERTHINKING"],
        keywords: ["Earth", "Rain", "Reset"],
        image: "/images/sense/scent_rain.jpg"
    },
    {
        id: "s8",
        title: "블랙페퍼 & 스파이시",
        description: "톡 쏘는 매운 향은 정체된 에너지를 순환시키고 열정을 자극합니다.",
        type: "smell",
        tags: ["LOW_MOTIVATION", "LETHARGY"],
        keywords: ["Spicy", "Energy", "Passion"],
        image: "/images/sense/scent_spice.jpg"
    },
    {
        id: "s9",
        title: "갓 구운 빵 냄새",
        description: "고소한 빵 냄새는 집안의 편안함을 연상시키며 심리적 허기를 채워줍니다.",
        type: "smell",
        tags: ["HIGH_AFFILIATION", "ANXIETY"],
        keywords: ["Bread", "Home", "Comfort"],
        image: "/images/sense/scent_bread.jpg"
    },
    {
        id: "s10",
        title: "프랑킨센스 (유향)",
        description: "종교적 의식에 쓰이던 이 향은 깊은 명상과 영적인 차분함을 돕습니다.",
        type: "smell",
        tags: ["HIGH_SENSITIVITY", "MEDITATION"],
        keywords: ["Holy", "Deep", "Meditation"],
        image: "/images/sense/scent_frankincense.jpg"
    },

    // --- TASTE (미각) ---
    {
        id: "t1",
        title: "다크 초콜릿 (카카오 70% 이상)",
        description: "쌉싸름한 맛은 정신을 번쩍 들게 하고 테오브로민이 집중력을 높여줍니다.",
        type: "taste",
        tags: ["HIGH_ACHIEVEMENT", "FATIGUE"],
        keywords: ["Bitter", "Focus", "Energy"],
        image: "/images/sense/taste_darkchoco.jpg"
    },
    {
        id: "t2",
        title: "따뜻한 밀크티",
        description: "부드럽고 달콤한 우유 음료는 긴장을 녹이고 유대감을 느끼게 합니다.",
        type: "taste",
        tags: ["HIGH_AFFILIATION", "ANXIETY"],
        keywords: ["Soft", "Sweet", "Comfort"],
        image: "/images/sense/taste_milktea.jpg"
    },
    {
        id: "t3",
        title: "탄산수 & 스파클링",
        description: "톡 쏘는 탄산의 자극은 답답한 속을 뚫어주고 기분을 전환시킵니다.",
        type: "taste",
        tags: ["STRESS", "ANGER"],
        keywords: ["Sparkling", "Refresh", "Cool"],
        image: "/images/sense/taste_sparkling.jpg"
    },
    {
        id: "t4",
        title: "에스프레소 싱글샷",
        description: "공축된 쓴맛과 카페인은 당신의 통제감과 프로페셔널한 감각을 깨워줍니다.",
        type: "taste",
        tags: ["HIGH_POWER", "FATIGUE"],
        keywords: ["Strong", "Professional", "Alert"],
        image: "/images/sense/taste_espresso.jpg"
    },
    {
        id: "t5",
        title: "매운 캡사이신 음식",
        description: "강렬한 매운맛은 엔돌핀을 돌게 하여 우울감을 일시적으로 날려버립니다.",
        type: "taste",
        tags: ["DEPRESSION", "LETHARGY"],
        keywords: ["Spicy", "Endorphin", "Hot"],
        image: "/images/sense/taste_spicy.jpg"
    },
    {
        id: "t6",
        title: "상큼한 레몬 캔디",
        description: "신맛은 부교감 신경을 자극하여 침을 고이게 하고 생기를 줍니다.",
        type: "taste",
        tags: ["LOW_ENERGY", "BOREDOM"],
        keywords: ["Sour", "Fresh", "Energy"],
        image: "/images/sense/taste_lemon.jpg"
    },
    {
        id: "t7",
        title: "견과류와 씹는 간식",
        description: "오독오독 씹는 행위(저작 운동)는 뇌 혈류량을 늘리고 공격성을 해소합니다.",
        type: "taste",
        tags: ["STRESS", "AGGRESSION"],
        keywords: ["Crunchy", "Chew", "StressRelief"],
        image: "/images/sense/taste_nuts.jpg"
    },
    {
        id: "t8",
        title: "허브티 (캐모마일)",
        description: "은은한 꽃 향의 차는 과열된 신경계를 식혀줍니다.",
        type: "taste",
        tags: ["INSOMNIA", "ANXIETY"],
        keywords: ["Tea", "Calm", "Relax"],
        image: "/images/sense/taste_tea.jpg"
    },
    {
        id: "t9",
        title: "고급 와인 한 잔",
        description: "풍미 있는 와인은 성공의 맛을 음미하게 하며 감각적 쾌락을 충족시킵니다.",
        type: "taste",
        tags: ["HIGH_POWER", "REWARD"],
        keywords: ["Wine", "Luxury", "Reward"],
        image: "/images/sense/taste_wine.jpg"
    },
    {
        id: "t10",
        title: "이온 음료 & 수분",
        description: "갈증 해소는 가장 기본적인 욕구를 충족시키며 뇌 기능을 정상화합니다.",
        type: "taste",
        tags: ["BURNOUT", "FATIGUE"],
        keywords: ["Water", "Hydration", "Basic"],
        image: "/images/sense/taste_water.jpg"
    },

    // --- TACTILE (촉각) ---
    {
        id: "tc1",
        title: "차가운 메탈 시계/펜",
        description: "차갑고 단단한 금속의 감촉은 당신에게 냉철한 판단력과 권위를 상기시킵니다.",
        type: "touch",
        tags: ["HIGH_POWER", "LOW_CONTROL"],
        keywords: ["Metal", "Cold", "Firm"],
        image: "/images/sense/touch_metal.jpg"
    },
    {
        id: "tc2",
        title: "보들보들한 담요",
        description: "극세사의 부드러운 감촉은 심리적 방어기제를 낮추고 안전함을 느끼게 합니다.",
        type: "touch",
        tags: ["HIGH_AFFILIATION", "INSECURITY"],
        keywords: ["Soft", "Warm", "Safe"],
        image: "/images/sense/touch_blanket.jpg"
    },
    {
        id: "tc3",
        title: "스트레스 볼 스퀴징",
        description: "손안에 꽉 차는 물체를 힘껏 쥐는 행위는 억눌린 분노와 스트레스를 배출합니다.",
        type: "touch",
        tags: ["HIGH_STRESS", "ANGER"],
        keywords: ["Squeeze", "Release", "Power"],
        image: "/images/sense/touch_ball.jpg"
    },
    {
        id: "tc4",
        title: "고운 모래나 쌀 만지기",
        description: "손가락 사이로 빠져나가는 알갱이들의 감각은 미세한 신경을 자극해 잡념을 없앱니다.",
        type: "touch",
        tags: ["OVERTHINKING", "ANXIETY"],
        keywords: ["Sand", "Flow", "Tactile"],
        image: "/images/sense/touch_sand.jpg"
    },
    {
        id: "tc5",
        title: "차가운 얼음 마사지",
        description: "피부에 닿는 얼음의 통각에 가까운 차가움은 멍한 정신을 즉시 깨웁니다.",
        type: "touch",
        tags: ["DROWSINESS", "DISSOCIATION"],
        keywords: ["Ice", "Cold", "Awake"],
        image: "/images/sense/touch_ice.jpg"
    },
    {
        id: "tc6",
        title: "반려동물 쓰다듬기",
        description: "따뜻한 체온과 털의 감촉은 옥시토신을 분비시켜 즉각적인 행복감을 줍니다.",
        type: "touch",
        tags: ["HIGH_AFFILIATION", "DEPRESSION"],
        keywords: ["Pet", "Fur", "Love"],
        image: "/images/sense/touch_pet.jpg"
    },
    {
        id: "tc7",
        title: "묵직한 가중 담요",
        description: "몸을 짓누르는 듯한 무게감은 포옹받는 듯한 안정감을 주어 수면을 돕습니다.",
        type: "touch",
        tags: ["INSOMNIA", "ANXIETY"],
        keywords: ["Heavy", "Hug", "Sleep"],
        image: "/images/sense/touch_heavy.jpg"
    },
    {
        id: "tc8",
        title: "까칠한 잔디 밟기 (맨발)",
        description: "발바닥에 닿는 거친 자연의 감촉은 당신을 현실로 돌아오게(Earthing) 합니다.",
        type: "touch",
        tags: ["DISSOCIATION", "STRESS"],
        keywords: ["Grass", "Earth", "Real"],
        image: "/images/sense/touch_grass.jpg"
    },
    {
        id: "tc9",
        title: "고급 가죽 소파의 질감",
        description: "매끄럽고 탄탄한 가죽의 질감은 당신의 성공 경험과 자부심을 자극합니다.",
        type: "touch",
        tags: ["HIGH_POWER", "REWARD"],
        keywords: ["Leather", "Smooth", "Luxury"],
        image: "/images/sense/touch_leather.jpg"
    },
    {
        id: "tc10",
        title: "타자기 키보드의 타건감",
        description: "손끝에 전해지는 명확한 구분감(Clicky)은 성취감과 통제감을 줍니다.",
        type: "touch",
        tags: ["HIGH_ACHIEVEMENT", "CONTROL"],
        keywords: ["Typing", "Click", "Feedback"],
        image: "/images/sense/touch_keyboard.jpg"
    }
];

// Helper to get random solutions based on tags
export const getRecommendedSolutions = (scores: any): SenseSolutionItem[] => {
    // Basic logic to determine tags from scores
    // This can be expanded significantly
    const tags = [];
    if (scores?.Z_iM_Pow > 0.5) tags.push("HIGH_POWER");
    if (scores?.Z_iM_Ach > 0.5) tags.push("HIGH_ACHIEVEMENT");
    if (scores?.Z_iM_Aff > 0.5) tags.push("HIGH_AFFILIATION");
    if (scores?.Z_W_Wellbeing < -0.5) tags.push("DEPRESSION", "LOW_ENERGY");
    if (scores?.Z_PSCI > 1.0) tags.push("STRESS", "ANXIETY");

    // Filter Items
    let recommendations = SENSE_SOLUTIONS.filter(item =>
        item.tags.some(tag => tags.includes(tag))
    );

    // If too few, fill with generic high-rated ones or random
    if (recommendations.length < 5) {
        const remaining = SENSE_SOLUTIONS.filter(item => !recommendations.includes(item));
        recommendations = [...recommendations, ...remaining.sort(() => 0.5 - Math.random())];
    }

    // Return top 5 unique types if possible, or just top 5
    // Try to get one of each type if possible? 
    // Let's just shuffle and take 5 for now to ensure variety
    return recommendations.sort(() => 0.5 - Math.random()).slice(0, 5);
};
