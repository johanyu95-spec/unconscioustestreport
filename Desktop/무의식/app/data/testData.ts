// Reconstructed Data based on standard psychological tests (IAT, SDT, PERMA)

export const TestData = {
    iatCategories: {
        self: ["나의", "나는", "내 안의", "스스로", "나에게", "자신이"],
        other: ["타인", "그들의", "외부", "다른 사람", "세상", "군중"],
        receptive: ["책임감", "신중함", "친절함", "협조적", "계획적", "안정적인"],
        repressive: ["경쟁심", "충동적", "공격적", "냉정한", "창조적", "독립적"],
    },

    implicitCommonQuestions: [
        { id: "q1", text: "나는 지금 나의 능력을 발휘하여 <span className='text-amber-600 font-black'>성공적</span>으로 과제를 완수할 수 있을 것 같다." },
        { id: "q2", text: "나는 이 어려운 일을 잠시 <span className='text-amber-600 font-black'>미루거나 회피</span>하고 싶은 충동을 느낀다." },
        { id: "q3", text: "나는 이 상황에서 <span className='text-amber-600 font-black'>상황을 통제</span>하거나 <span className='text-amber-600 font-black'>다른 사람들에게 영향</span>을 주고 싶다." },
        { id: "q4", text: "나는 <span className='text-amber-600 font-black'>다른 사람들에게 압도</span>되거나 약해 보일까 봐 두렵다." },
        { id: "q5", text: "나는 이 사람들과 <span className='text-amber-600 font-black'>따뜻하고 편안한 연결감</span>을 맺고 싶다." },
        { id: "q6", text: "나는 이 상황에서 <span className='text-amber-600 font-black'>거절당하거나 외톨이가 될까 봐</span> 불안하다." }
    ],

    implicitImages: [
        {
            id: "img1",
            src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
            text: "회의 테이블이나 무대 위에서 다수의 시선을 받으며 발표하거나 지시하는 인물"
        },
        {
            id: "img2",
            src: "https://images.unsplash.com/photo-1516589174184-c6848463ea7c?q=80&w=1000&auto=format&fit=crop",
            text: "두 인물 간의 정서적 교감 또는 갈등이 모호하게 표현된 장면"
        },
        {
            id: "img3",
            src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
            text: "여러 사람이 팀으로 협력하여 독창적인 구조물을 만드는 장면"
        },
        {
            id: "img4",
            src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop",
            text: "한 인물이 다른 인물을 위로하거나 돕고 있는 장면"
        },
        {
            id: "img5",
            src: "https://images.unsplash.com/photo-1501535033-a598ff2743f4?q=80&w=1000&auto=format&fit=crop",
            text: "안개가 낀 길 앞에서 지도나 나침반을 들고 고민하는 고독한 인물"
        },
        {
            id: "img6",
            src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop",
            text: "거울 앞에 서서 자신의 내면을 들여다보는 듯한 인물"
        }
    ],

    explicitQuestions: [
        "나는 도전적인 목표를 세우고 그 목표에 도달했을 때 스스로 유능하다는 경험을 하고 싶다.",
        "나는 나의 목표가 다른 사람들보다 더 뛰어난 결과를 가져오는 것을 보여주고 싶다.",
        "나는 나의 목표를 통해 높은 수준의 기준과 우수성을 달성하는 것에 집중한다.",
        "나는 목표 달성 과정을 통해 그룹 내에서 주도적인 역할을 맡아 영향력을 행사하고 싶다.",
        "나는 나의 목표가 권위 있는 위치나 지위 획득에 기여하기를 바란다.",
        "나는 목표 추구를 통해 다른 사람들의 결정이나 행동에 성공적으로 영향을 미치고 싶다.",
        "나는 목표를 통해 타인과 따뜻하고 친밀한 관계를 유지하는 것을 중요하게 생각한다.",
        "나는 목표 달성 과정에서 사람들과 어울리며 깊은 소속감을 느끼고 싶다.",
        "나는 타인과의 관계에서 조화롭고 협력적인 태도를 유지하는 것을 목표로 한다."
    ],

    wellbeingQuestions: [
        "나는 스스로에게 의미 있는 목표를 추구할 때 가장 큰 에너지를 얻는다",
        "나는 주변의 기대나 시선에 휩쓸리지 않고 나의 결정을 지지하는 편이다",
        "나는 현재 진행 중인 일이나 학습에서 '내가 잘하고 있다'는 느낌을 자주 받는다",
        "나는 새로운 도전을 할 때, 나의 능력이 충분하다고 믿는다",
        "나는 나의 진정한 모습을 보여줄 수 있는, 깊은 신뢰 관계를 맺고 있다",
        "나는 필요할 때 언제든 나를 지지해 줄 사람이 있다고 느낀다",
        "나는 하루 중 웃거나 긍정적인 감정을 느끼는 시간이 충분하다",
        "나는 대체로 낙관적이며, 미래에 대해 기대감을 느낀다",
        "나는 내가 하는 일이나 활동에 깊이 몰입하여 시간 가는 줄 모르는 경험을 한다",
        "나는 일상생활에서 흥미롭고 재미있는 일을 찾고 참여하는 편이다",
        "나는 나를 지지하고 이해해주는 사람들과의 관계에 만족한다",
        "나는 어려움을 겪을 때 도움을 청할 수 있는 믿음직한 사람이 있다",
        "나는 내 삶의 방향이 궁극적인 의미와 목적을 가지고 있다고 생각한다",
        "나는 내 삶이 개인적인 차원을 넘어 더 넓은 가치에 기여하고 있다고 느낀다",
        "나는 내가 정한 중요한 목표들을 성공적으로 달성하고 있다는 느낌을 받는다",
        "나는 나의 노력과 능력을 통해 눈에 띄는 발전과 성장이 이루고 있다고 생각한다",
        "나는 목표를 추구하는 과정에서 자주 무기력함이나 심리적 소진을 경험한다",
        "내가 세운 목표는 주로 타인의 인정을 받거나 사회적 지위를 높이기 위한 것이다"
    ]
};
