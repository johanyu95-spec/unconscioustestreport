import { PaimaScores } from './scoring';

export type ProfileKey = string;

export const determineProfile = (scores: PaimaScores): ProfileKey => {
    const {
        Z_PSCI, Z_MDI_Ach, Z_MDI_Pow, Z_MDI_Aff,
        Z_iM_Ach, Z_iM_Pow, Z_iM_Aff,
        Z_eM_Ach, Z_eM_Pow, Z_eM_Aff,
        Z_N_Auto, Z_N_Comp, Z_N_Rela,
        Z_W_Wellbeing, Z_C_Depletion, Z_C_External
    } = scores;

    // Helper: Thresholds for Z-scores (-2.0 to +2.0 range)
    const HIGH = 0.5;      // Approx top 30%
    const VERY_HIGH = 1.0; // Approx top 16%
    const LOW = -0.5;
    const VERY_LOW = -1.0;

    // 1. INTEGRATED_SAGE (High Well-being, Low Conflict)
    // Statistical Role: Low MDI, Low PSCI, High Needs.
    if (
        Z_PSCI < 0 &&
        Z_MDI_Ach < 0.5 && Z_MDI_Pow < 0.5 && Z_MDI_Aff < 0.5 &&
        Z_W_Wellbeing > 0.5
    ) {
        return 'INTEGRATED_SAGE';
    }

    // 2. WANDERING_EXPLORER (Low Energy, Indifference)
    // Low Implicit Motives across board, Low Wellbeing.
    if (
        Z_iM_Ach < 0 && Z_iM_Pow < 0 && Z_iM_Aff < 0 &&
        Z_W_Wellbeing < 0
    ) {
        return 'WANDERING_EXPLORER';
    }

    // 3. EXHAUSTED_HERO (High Achievement Conflict)
    // High MDI_Ach or High eM_Ach with High Depletion/Conflict
    if (
        (Z_MDI_Ach > HIGH && Z_eM_Ach > HIGH) ||
        (Z_iM_Ach > HIGH && Z_C_Depletion > HIGH)
    ) {
        return 'EXHAUSTED_HERO';
    }

    // 4. SUPPRESSED_CREATOR (High External Control, Low Autonomy)
    if (
        Z_C_External > HIGH ||
        Z_N_Auto < LOW
    ) {
        return 'SUPPRESSED_CREATOR';
    }

    // 5. DORMANT_RULER (High Implicit Power, Low Explicit Power)
    // Hidden Ambition.
    if (
        Z_iM_Pow > HIGH &&
        Z_eM_Pow < HIGH // Not fully claiming it explicitly
    ) {
        return 'DORMANT_RULER';
    }

    // 6. OVERLOADED_CAREGIVER (High Affiliation Conflict)
    if (
        Z_MDI_Aff > HIGH &&
        Z_iM_Aff > HIGH
    ) {
        return 'OVERLOADED_CAREGIVER';
    }

    // 7. CONFLICTED_LOVER (High PSCI - Shadow Conflict)
    if (
        Z_PSCI > HIGH
    ) {
        return 'CONFLICTED_LOVER';
    }

    // Fallback based on Dominant Implicit Motive
    if (Z_iM_Ach >= Z_iM_Pow && Z_iM_Ach >= Z_iM_Aff) return 'EXHAUSTED_HERO';
    if (Z_iM_Pow >= Z_iM_Ach && Z_iM_Pow >= Z_iM_Aff) return 'DORMANT_RULER';

    return 'OVERLOADED_CAREGIVER'; // Default Aff dominance
};

export const determineDetailedProfile = (scores: PaimaScores): string => {
    const baseProfile = determineProfile(scores);
    const subtype = determineSubtype(scores);
    return `${baseProfile}_${subtype}`;
};

const determineSubtype = (scores: PaimaScores): string => {
    const { Z_C_Depletion, Z_PSCI, Z_C_External, Z_W_Wellbeing, Z_iM_Ach, Z_iM_Pow, Z_iM_Aff, Z_eM_Ach, Z_eM_Pow, Z_eM_Aff } = scores;
    const THRESHOLD = 0.8;

    // 1. BURNOUT (High Depletion)
    if (Z_C_Depletion > THRESHOLD) return 'BURNOUT';

    // 2. ANXIOUS (High Conflict/PSCI)
    if (Z_PSCI > THRESHOLD) return 'ANXIOUS';

    // 3. PRESSURED (High External)
    if (Z_C_External > THRESHOLD) return 'PRESSURED';

    // 4. WELL (High Wellbeing, Low Depletion)
    if (Z_W_Wellbeing > THRESHOLD && Z_C_Depletion < 0) return 'WELL';

    // 5. SECRETIVE (High Discrepancy eM < iM)
    // Hidden desires.
    const achGap = Z_iM_Ach - Z_eM_Ach;
    const powGap = Z_iM_Pow - Z_eM_Pow;
    const affGap = Z_iM_Aff - Z_eM_Aff;
    if (Math.max(achGap, powGap, affGap) > 1.0) return 'SECRETIVE';

    // 6. SOCIAL (Affiliation as secondary high)
    if (Z_iM_Aff > 0.5) return 'SOCIAL';

    // 7. DOMINANT (Power as secondary high)
    if (Z_iM_Pow > 0.5) return 'DOMINANT';

    // 8. PURE (Default)
    return 'PURE';
};
