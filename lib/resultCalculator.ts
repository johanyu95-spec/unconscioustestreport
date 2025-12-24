export interface PAIMAIndicators {
    // 1. Conflict & Discrepancy (MDI)
    Z_PSCI: number;
    Z_MDI_Ach: number;
    Z_MDI_Pow: number;
    Z_MDI_Aff: number;

    // 2. Implicit Motives (iM)
    Z_iM_Ach: number;
    Z_iM_Pow: number;
    Z_iM_Aff: number;

    // 3. Explicit Motives (eM)
    Z_eM_Ach: number;
    Z_eM_Pow: number;
    Z_eM_Aff: number;

    // 4. Basic Psychological Needs (SDT)
    Z_N_Auto: number;
    Z_N_Comp: number;
    Z_N_Rela: number;

    // 5. Outcomes
    Z_W_Wellbeing: number;     // PERMA
    Z_C_Depletion: number;     // Conflict Recognition
    Z_C_External: number;      // External Control perception
    profileKey: string;
}

// Standardization Stats (Normative Data)
const STATS = {
    iAch: { mean: 3.0, sd: 0.8 }, // Optimized for 36 questions
    iPow: { mean: 3.0, sd: 0.8 },
    iAff: { mean: 3.0, sd: 0.8 },
    eAch: { mean: 3.5, sd: 1.0 },
    ePow: { mean: 3.0, sd: 1.0 },
    eAff: { mean: 3.8, sd: 0.9 },
    nAuto: { mean: 3.5, sd: 0.8 },
    nComp: { mean: 3.5, sd: 0.8 },
    nRela: { mean: 3.5, sd: 0.8 },
    wWellbeing: { mean: 3.0, sd: 1.0 },
    cDepletion: { mean: 2.5, sd: 1.0 },
    cExternal: { mean: 2.5, sd: 1.0 },
};

// Profile Centroids (Standardized Targets)
const PROFILE_CENTROIDS: Record<string, Partial<Record<string, number>>> = {
    'INTEGRATED_SAGE': { Z_PSCI: -1.5, Z_W_Wellbeing: 1.5, Z_N_Auto: 1.0 },
    'EXHAUSTED_HERO': { Z_PSCI: 1.5, Z_C_Depletion: 1.5, Z_MDI_Ach: 1.5 },
    'SUPPRESSED_CREATOR': { Z_PSCI: 1.5, Z_C_External: 1.5, Z_N_Auto: -1.5 },
    'WANDERING_EXPLORER': { Z_iM_Ach: -1.0, Z_eM_Ach: -1.0, Z_PSCI: -0.5 },
    'OVERLOADED_CAREGIVER': { Z_MDI_Aff: 1.5, Z_iM_Aff: 1.0, Z_eM_Pow: 1.0 },
    'DORMANT_RULER': { Z_iM_Pow: 1.5, Z_eM_Pow: -1.0, Z_MDI_Pow: 2.0 },
    'CONFLICTED_LOVER': { Z_MDI_Aff: 1.5, Z_PSCI: 1.0, Z_C_Depletion: 1.0 },
};

const getImplicitMotiveAvg = (answers: Record<string, number>, targetQuestionIds: string[]) => {
    let sum = 0;
    let count = 0;

    // Aggregation logic for 36 trials (6 images x 6 questions)
    Object.entries(answers).forEach(([key, val]) => {
        // key format: "img_id_qId" (e.g., "img_hero_q1")
        const qId = key.split('_').pop();
        if (qId && targetQuestionIds.includes(qId)) {
            sum += val;
            count++;
        }
    });

    return count > 0 ? sum / count : 3.0;
};

const getAvg = (answers: Record<number, number>, indices: number[]) => {
    let sum = 0;
    let count = 0;
    indices.forEach(idx => {
        if (answers[idx] !== undefined) {
            sum += answers[idx];
            count++;
        }
    });
    return count > 0 ? sum / count : 3.0; // Neutral default
};

const calcZ = (raw: number, key: keyof typeof STATS) => {
    const { mean, sd } = STATS[key];
    return parseFloat(((raw - mean) / sd).toFixed(2));
};

export const getInterpretation = (zScore: number): string => {
    if (zScore >= 1.5) return "매우 높음";
    if (zScore >= 0.5) return "높음";
    if (zScore >= -0.5) return "보통";
    return "낮음";
};

export const calculatePAIMAIndicators = (results: any): PAIMAIndicators => {
    const iA = results.implicit?.implicitAnswers || {};
    const eA = results.explicit?.explicitAnswers || {};
    const wA = results.wellbeing?.wellbeingAnswers || {};

    // 1. Calculate Implicit Z-Scores (Mapping q1-q6 to standard motive categories)
    // q1, q2 -> Achievement
    // q3, q4 -> Power
    // q5, q6 -> Affiliation
    const Z_iM_Ach = calcZ(getImplicitMotiveAvg(iA, ['q1', 'q2']), 'iAch');
    const Z_iM_Pow = calcZ(getImplicitMotiveAvg(iA, ['q3', 'q4']), 'iPow');
    const Z_iM_Aff = calcZ(getImplicitMotiveAvg(iA, ['q5', 'q6']), 'iAff');

    // 2. Calculate Explicit Z-Scores (Mapping 6 explicit questions to motives)
    // q1(Pow), q2(Ach), q3(Aff), q4(Pow), q5(Ach), q6(Aff)
    const Z_eM_Ach = calcZ(getAvg(eA, [1, 4]), 'eAch');
    const Z_eM_Pow = calcZ(getAvg(eA, [0, 3]), 'ePow');
    const Z_eM_Aff = calcZ(getAvg(eA, [2, 5]), 'eAff');

    // 3. Calculate SDT & Outcomes
    const Z_N_Auto = calcZ(getAvg(eA, [0, 3]), 'nAuto'); // Autonomy proxy
    const Z_N_Comp = calcZ(getAvg(eA, [1, 4]), 'nComp'); // Competence proxy
    const Z_N_Rela = calcZ(getAvg(eA, [2, 5]), 'nRela'); // Relatedness proxy

    // Wellbeing questions (5 total) 
    const Z_W_Wellbeing = calcZ(getAvg(wA, [0, 1, 2]), 'wWellbeing');
    const Z_C_Depletion = calcZ(getAvg(wA, [3]), 'cDepletion');
    const Z_C_External = calcZ(getAvg(wA, [4]), 'cExternal');

    // 2. Calculate Derived MDI & PSCI
    const Z_MDI_Ach = parseFloat(Math.abs(Z_eM_Ach - Z_iM_Ach).toFixed(2));
    const Z_MDI_Pow = parseFloat(Math.abs(Z_eM_Pow - Z_iM_Pow).toFixed(2));
    const Z_MDI_Aff = parseFloat(Math.abs(Z_eM_Aff - Z_iM_Aff).toFixed(2));
    const Z_PSCI = parseFloat(((Z_MDI_Ach + Z_MDI_Pow + Z_MDI_Aff) / 3).toFixed(2));

    const scores: any = {
        Z_PSCI, Z_MDI_Ach, Z_MDI_Pow, Z_MDI_Aff,
        Z_iM_Ach, Z_iM_Pow, Z_iM_Aff,
        Z_eM_Ach, Z_eM_Pow, Z_eM_Aff,
        Z_N_Auto, Z_N_Comp, Z_N_Rela,
        Z_W_Wellbeing, Z_C_Depletion, Z_C_External
    };

    // 3. Determine Profile via Centroid Distance
    let profileKey = 'WANDERING_EXPLORER';
    let minDistance = Infinity;

    Object.entries(PROFILE_CENTROIDS).forEach(([key, centroid]) => {
        let distance = 0;
        let count = 0;

        Object.entries(centroid).forEach(([metric, targetValue]) => {
            const userValue = scores[metric] ?? 0;
            distance += Math.pow(userValue - (targetValue ?? 0), 2);
            count++;
        });

        const meanSquaredDistance = count > 0 ? distance / count : Infinity;
        if (meanSquaredDistance < minDistance) {
            minDistance = meanSquaredDistance;
            profileKey = key;
        }
    });

    return {
        ...scores,
        profileKey
    };
};

export interface PAIMAIndicators {
    // ... items ...
    Z_PSCI: number;
    // ...
    Z_C_External: number;
    profileKey: string;
}
