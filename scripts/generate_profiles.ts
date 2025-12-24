
export interface ProfileData {
    key: string;
    name: string;
    summary: string;
    description: string;
    features: string[];
}

// 7 Base Archetypes Metadata
const BASE_META = {
    'INTEGRATED_SAGE': { kor: '현자', eng: 'Sage', traits: ['통찰', '지혜', '균형'] },
    'EXHAUSTED_HERO': { kor: '영웅', eng: 'Hero', traits: ['성취', '목표', '돌파'] },
    'SUPPRESSED_CREATOR': { kor: '창조자', eng: 'Creator', traits: ['영감', '독창성', '표현'] },
    'WANDERING_EXPLORER': { kor: '탐험가', eng: 'Explorer', traits: ['자유', '탐색', '경험'] },
    'OVERLOADED_CAREGIVER': { kor: '돌보미', eng: 'Caregiver', traits: ['헌신', '배려', '공감'] },
    'DORMANT_RULER': { kor: '통치자', eng: 'Ruler', traits: ['통제', '책임', '리더십'] },
    'CONFLICTED_LOVER': { kor: '연인', eng: 'Lover', traits: ['친밀', '열정', '매력'] }
};

// 8 Subtype Metadata
const SUBTYPE_META = {
    'PURE': { label: '본연의', desc: '이 유형의 가장 순수한 형태' },
    'BURNOUT': { label: '방전된', desc: '극심한 에너지 고갈 상태' },
    'ANXIOUS': { label: '흔들리는', desc: '내면의 불안과 갈등' },
    'PRESSURED': { label: '억눌린', desc: '외부의 과도한 압박' },
    'SECRETIVE': { label: '그림자 속의', desc: '욕구를 숨기고 있는' },
    'WELL': { label: '깨어난', desc: '건강하고 긍정적인 발현' },
    'SOCIAL': { label: '다정한', desc: '타인과의 유대를 중시하는' },
    'DOMINANT': { label: '강인한', desc: '주도권을 쥐고 있는' }
};

// Specialized Creative Titles & Content (Overrides)
const CREATIVE_MATRIX: Record<string, { title: string, subtitle: string, summary: string, desc: string }> = {
    // --- EXHAUSTED HERO (소진된 영웅) Variations ---
    'EXHAUSTED_HERO_BURNOUT': {
        title: '날개 꺾인 승리자',
        subtitle: 'The Broken-Winged Victor',
        summary: '눈부신 성취를 거두었지만, 더 이상 날아오를 에너지가 남지 않은 상태입니다.',
        desc: '당신은 수많은 전투에서 승리해왔지만, 그 대가로 당신의 영혼은 휴식을 잊었습니다. 승리의 트로피는 쌓여가는데 내면은 텅 비어가는 공허함을 느끼고 있지 않나요? 이제는 성취보다 존재 그 자체로 쉴 때입니다.'
    },
    'EXHAUSTED_HERO_ANXIOUS': {
        title: '벼랑 끝의 투사',
        subtitle: 'The Warrior on the Edge',
        summary: '떨어질 것 같은 불안함 속에서도 멈추지 못하고 계속 달리는 상태입니다.',
        desc: '성공하지 못하면 버려질 것이라는 두려움이 당신을 채찍질하고 있습니다. 당신의 질주는 용기가 아니라 불안에서 비롯된 것일 수 있습니다. '
    },
    'EXHAUSTED_HERO_PRESSURED': {
        title: '무거운 왕관을 쓴 영웅',
        subtitle: 'The Burdened Hero',
        summary: '타인의 기대와 세상의 시선이 당신의 어깨를 짓누르고 있습니다.',
        desc: '당신의 성취는 당신의 것이기보다 남들에게 보여주기 위한 것일지도 모릅니다. 기대에 부응하기 위해 가면을 쓰고 버티느라 정작 "나"는 사라지고 있습니다.'
    },

    // --- INTEGRATED SAGE (통합된 현자) Variations ---
    'INTEGRATED_SAGE_PURE': {
        title: '고요한 숲의 현자',
        subtitle: 'The Sage of the Silent Forest',
        summary: '내면의 깊은 평화와 지혜가 공존하는 가장 이상적인 상태입니다.',
        desc: '세상의 소음 속에서도 중심을 잃지 않는 당신은, 타인에게도 평온한 그늘을 제공합니다. 당신의 지혜는 머리가 아닌 가슴에서 우러나옵니다.'
    },
    'INTEGRATED_SAGE_ANXIOUS': {
        title: '폭풍 속의 등대지기',
        subtitle: 'The Beacon in the Storm',
        summary: '지혜의 빛을 가지고 있지만, 거친 파도에 마음이 흔들리고 있습니다.',
        desc: '당신은 답을 알고 있지만, 현실의 상황이 그 답대로 살지 못하게 만들어 혼란스럽습니다. 하지만 등대는 폭풍 속에서 가장 빛난다는 사실을 기억하세요.'
    },
    'INTEGRATED_SAGE_BURNOUT': {
        title: '지쳐버린 예언자',
        subtitle: 'The Weary Prophet',
        summary: '너무 많은 것을 꿰뚫어 보느라 정서적 에너지가 고갈되었습니다.',
        desc: '세상의 이치를 이해한다는 것은 때로 고독하고 피곤한 일입니다. 이제는 통찰을 멈추고 단순히 "존재하는" 감각을 회복해야 할 때입니다.'
    },

    // --- SUPPRESSED CREATOR (억압된 창조자) Variations ---
    'SUPPRESSED_CREATOR_SECRETIVE': {
        title: '가면 쓴 예술가',
        subtitle: 'The Masked Artist',
        summary: '평범한 직장인이나 학생의 가면 뒤에 천재적인 영감을 숨기고 있습니다.',
        desc: '당신의 머릿속에는 우주가 들어있지만, 세상은 당신에게 엑셀 시트와 성적표를 요구합니다. 숨겨진 그 우주가 터져 나오기 일보 직전입니다.'
    },
    'SUPPRESSED_CREATOR_PRESSURED': {
        title: '새장에 갇힌 파랑새',
        subtitle: 'The Caged Bluebird',
        summary: '현실의 의무와 책임이라는 창살이 당신의 자유로운 날갯짓을 막고 있습니다.',
        desc: '안정적인 삶을 위해 꿈을 유보했지만, 그 대가로 영혼이 조금씩 시들어가고 있습니다. 새장은 안전하지만, 하늘을 날 수는 없습니다.'
    },

    // --- WANDERING EXPLORER (방황하는 탐험가) Variations ---
    'WANDERING_EXPLORER_WELL': {
        title: '자유로운 바람의 여행자',
        subtitle: 'The Traveler of the Wind',
        summary: '목적지가 없어도 그 과정 자체를 온전히 즐기는 행복한 방랑자입니다.',
        desc: '당신에게 인생은 달성해야 할 과제가 아니라 경험해야 할 축제입니다. 구속받지 않는 당신의 영혼은 누구보다 가볍고 자유롭습니다.'
    },
    'WANDERING_EXPLORER_BURNOUT': {
        title: '나침반을 잃은 선장',
        subtitle: 'The Captain Without a Compass',
        summary: '어디로 가야 할지 몰라 망망대해 위에 멈춰 서 있는 무기력한 상태입니다.',
        desc: '자유가 오히려 짐이 되어버렸습니다. 선택지가 너무 많아 아무것도 선택하지 못하는 역설적인 상황에 빠져 에너지를 잃었습니다.'
    },

    // --- OVERLOADED CAREGIVER (과부하된 돌보미) Variations ---
    'OVERLOADED_CAREGIVER_SOCIAL': {
        title: '모두의 수호천사',
        subtitle: 'The Guardian Angel for All',
        summary: '자신의 날개가 젖는 줄도 모르고 남에게 우산을 씌워주는 존재입니다.',
        desc: '당신의 사랑은 넓고 깊지만, 그 사랑 안에 "자신"을 위한 자리는 없습니다. 남을 돕는 기쁨이 어느새 의무라는 무거운 짐이 되어버렸습니다.'
    },
    'OVERLOADED_CAREGIVER_ANXIOUS': {
        title: '상처 입은 힐러',
        subtitle: 'The Wounded Healer',
        summary: '남을 치료하느라 정작 자신의 상처는 곪아가고 있습니다.',
        desc: '내가 돕지 않으면 그들이 떠날까 봐 두려워하고 있습니다. 당신의 헌신은 사랑이 아니라, 버림받지 않기 위한 생존 전략일 수도 있습니다.'
    },

    // --- DORMANT RULER (야망을 숨긴 통치자) Variations ---
    'DORMANT_RULER_SECRETIVE': {
        title: '그림자 속의 제왕',
        subtitle: 'The King in the Shadows',
        summary: '겸손한 척하고 있지만 속으로는 세상을 움직일 계획을 세우고 있습니다.',
        desc: '당신은 2인자의 자리에 만족하는 척하지만, 사실은 1인자보다 더 큰 그림을 그리고 있습니다. 때가 오기만을 기다리며 발톱을 숨기고 있는 호랑이와 같습니다.'
    },
    'DORMANT_RULER_DOMINANT': {
        title: '깨어난 사자',
        subtitle: 'The Awakened Lion',
        summary: '더 이상 본능을 숨기지 않고 압도적인 리더십을 발휘하기 시작했습니다.',
        desc: '주변을 장악하고 통제할 때 살아있음을 느낍니다. 하지만 그 힘이 과하면 주변 사람들을 두려움에 떨게 할 수 있습니다.'
    },

    // --- CONFLICTED LOVER (갈등하는 연인) Variations ---
    'CONFLICTED_LOVER_ANXIOUS': {
        title: '가시 돋친 장미',
        subtitle: 'The Thorny Rose',
        summary: '사랑받고 싶어서 다가가지만, 상처받기 싫어서 가시를 세웁니다.',
        desc: '누군가 다가오면 찌르고, 멀어지면 시들어버리는 슬픈 모순 속에 있습니다. 당신의 가시는 사실 "나를 제발 안아줘"라는 비명입니다.'
    },
    'CONFLICTED_LOVER_WELL': {
        title: '열정적인 로맨티스트',
        subtitle: 'The Passionate Romantic',
        summary: '사랑의 기쁨과 슬픔을 모두 있는 그대로 받아들이는 용기 있는 연인입니다.',
        desc: '상처받을 위험을 감수하고서라도 누군가를 깊이 사랑할 준비가 되었습니다. 당신의 감정은 풍부하고 진실됩니다.'
    }
};

// Generic Template Generator
function generateGenericContent(baseKey: string, subKey: string) {
    const base = BASE_META[baseKey as keyof typeof BASE_META];
    const sub = SUBTYPE_META[subKey as keyof typeof SUBTYPE_META];

    const titleMap: Record<string, string> = {
        'PURE': `진정한 ${base.kor}`,
        'BURNOUT': `방전된 ${base.kor}`,
        'ANXIOUS': `고뇌하는 ${base.kor}`,
        'PRESSURED': `억압받는 ${base.kor}`,
        'SECRETIVE': `숨어있는 ${base.kor}`,
        'WELL': `성숙한 ${base.kor}`,
        'SOCIAL': `다정한 ${base.kor}`,
        'DOMINANT': `강인한 ${base.kor}`
    };

    const subtitleMap: Record<string, string> = {
        'PURE': `The True ${base.eng}`,
        'BURNOUT': `The Burned-out ${base.eng}`,
        'ANXIOUS': `The Agonizing ${base.eng}`,
        'PRESSURED': `The Suppressed ${base.eng}`,
        'SECRETIVE': `The Hidden ${base.eng}`,
        'WELL': `The Mature ${base.eng}`,
        'SOCIAL': `The Friendly ${base.eng}`,
        'DOMINANT': `The Strong ${base.eng}`
    };

    return {
        title: titleMap[subKey],
        subtitle: subtitleMap[subKey],
        summary: `${sub.label} 모습의 ${base.kor}입니다. ${sub.desc}.`,
        desc: `${base.kor}의 성향(${base.traits.join(', ')})을 가지고 있지만, 현재 ${sub.desc} 상태입니다. 본연의 에너지를 회복하기 위한 맞춤형 솔루션이 필요합니다.`,
        features: [...base.traits, sub.label]
    };
}

export function generateAll56Profiles(): ProfileData[] {
    const results: ProfileData[] = [];

    for (const baseKey of Object.keys(BASE_META)) {
        for (const subKey of Object.keys(SUBTYPE_META)) {
            const fullKey = `${baseKey}_${subKey}`;

            let content;
            if (CREATIVE_MATRIX[fullKey]) {
                const c = CREATIVE_MATRIX[fullKey];
                content = {
                    key: fullKey,
                    name: `${c.title} (${c.subtitle})`,
                    summary: c.summary,
                    description: c.desc,
                    features: [...BASE_META[baseKey as keyof typeof BASE_META].traits, SUBTYPE_META[subKey as keyof typeof SUBTYPE_META].label]
                };
            } else {
                const g = generateGenericContent(baseKey, subKey);
                content = {
                    key: fullKey,
                    name: `${g.title} (${g.subtitle})`,
                    summary: g.summary,
                    description: g.desc,
                    features: g.features
                };
            }
            results.push(content);
        }
    }
    return results;
}
