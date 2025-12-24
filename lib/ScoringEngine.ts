
export interface RawScores {
    // Motives (Implicit)
    iAch: number;
    iPow: number;
    iAff: number;
    // Motives (Explicit)
    eAch: number;
    ePow: number;
    eAff: number;
    // Needs & Wellbeing (Likert)
    nAuto: number;
    nComp: number;
    nRela: number;
    wWellbeing: number;
    cDepletion: number;
    cExternal: number;
}

export type ProfileType =
    | "INTEGRATED_SAGE"
    | "EXHAUSTED_HERO" // Changed from Burned-out Hero
    | "SUPPRESSED_CREATOR" // Changed from Repressed Creator
    | "WANDERING_EXPLORER"
    | "OVERLOADED_CAREGIVER"
    | "DORMANT_RULER"
    | "CONFLICTED_LOVER"
    | "UNCLASSIFIED";


// Mock Means and Standard Deviations for Standardization
const STATS = {
    iAch: { mean: 3.0, sd: 1.2 },
    iPow: { mean: 3.0, sd: 1.2 },
    iAff: { mean: 3.0, sd: 1.2 },
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

// Define Centroids for each profile based on key characteristics (High=1.5, Low=-1.5, Neutral=0)
const PROFILE_CENTROIDS: Record<ProfileType, Partial<Record<string, number>>> = {
    "INTEGRATED_SAGE": { z_PSCI: -1.5, z_W_Wellbeing: 1.5, z_N_Auto: 1.0 },
    "EXHAUSTED_HERO": { z_PSCI: 1.5, z_C_Depletion: 1.5, z_MDI_Ach: 1.5 },
    "SUPPRESSED_CREATOR": { z_PSCI: 1.5, z_C_External: 1.5, z_N_Auto: -1.5 },
    "WANDERING_EXPLORER": { z_iAch: -1.0, z_eAch: -1.0, z_PSCI: -0.5 },
    "OVERLOADED_CAREGIVER": { z_MDI_Aff: 1.5, z_iAff: 1.0, z_ePow: 1.0 },
    "DORMANT_RULER": { z_iPow: 1.5, z_ePow: -1.0, z_MDI_Pow: 2.0 },
    "CONFLICTED_LOVER": { z_MDI_Aff: 1.5, z_PSCI: 1.0, z_C_Depletion: 1.0 },
    "UNCLASSIFIED": {} // Should not happen with ranking
};

export class ScoringEngine {
    /**
     * Calculates Z-Score: (Raw - Mean) / SD
     */
    static calculateZ(raw: number, key: keyof typeof STATS): number {
        const { mean, sd } = STATS[key];
        const z = (raw - mean) / sd;
        return parseFloat(z.toFixed(2));
    }

    /**
     * Calculates all 16 metrics.
     */
    static calculateScores(raw: RawScores) {
        const zScores = {
            z_iAch: this.calculateZ(raw.iAch, "iAch"),
            z_iPow: this.calculateZ(raw.iPow, "iPow"),
            z_iAff: this.calculateZ(raw.iAff, "iAff"),
            z_eAch: this.calculateZ(raw.eAch, "eAch"),
            z_ePow: this.calculateZ(raw.ePow, "ePow"),
            z_eAff: this.calculateZ(raw.eAff, "eAff"),

            z_N_Auto: this.calculateZ(raw.nAuto, "nAuto"),
            z_N_Comp: this.calculateZ(raw.nComp, "nComp"),
            z_N_Rela: this.calculateZ(raw.nRela, "nRela"),

            z_W_Wellbeing: this.calculateZ(raw.wWellbeing, "wWellbeing"),
            z_C_Depletion: this.calculateZ(raw.cDepletion, "cDepletion"),
            z_C_External: this.calculateZ(raw.cExternal, "cExternal"),
        };

        // Calculate MDIs (Motive Discrepancy Index) = |Z(eM) - Z(iM)|
        const z_MDI_Ach = parseFloat(Math.abs(zScores.z_eAch - zScores.z_iAch).toFixed(2));
        const z_MDI_Pow = parseFloat(Math.abs(zScores.z_ePow - zScores.z_iPow).toFixed(2));
        const z_MDI_Aff = parseFloat(Math.abs(zScores.z_eAff - zScores.z_iAff).toFixed(2));

        // Calculate PSCI
        const z_PSCI = parseFloat(((z_MDI_Ach + z_MDI_Pow + z_MDI_Aff) / 3).toFixed(2));

        return {
            ...zScores,
            z_MDI_Ach,
            z_MDI_Pow,
            z_MDI_Aff,
            z_PSCI,
        };
    }

    /**
     * Determines the User Profile by finding the closest centroid.
     * Also returns ranking of all profiles.
     */
    static determineProfile(scores: ReturnType<typeof ScoringEngine.calculateScores>) {
        let bestMatch: ProfileType = "UNCLASSIFIED";
        let minDistance = Infinity;
        const rankings: { type: ProfileType; distance: number }[] = [];

        const profileKeys = Object.keys(PROFILE_CENTROIDS) as ProfileType[];

        profileKeys.forEach((type) => {
            if (type === "UNCLASSIFIED") return;

            const centroid = PROFILE_CENTROIDS[type];
            let distance = 0;
            let count = 0;

            // Calculate Euclidean distance only for defined dimensions in the centroid
            for (const key in centroid) {
                const targetValue = centroid[key as keyof typeof centroid] || 0;
                const userValue = scores[key as keyof typeof scores] as number;
                distance += Math.pow(userValue - targetValue, 2);
                count++;
            }

            // Normalize distance by number of dimensions to avoid bias against complex centroids
            const meanSquaredDistance = count > 0 ? distance / count : Infinity;

            rankings.push({ type, distance: meanSquaredDistance });

            if (meanSquaredDistance < minDistance) {
                minDistance = meanSquaredDistance;
                bestMatch = type;
            }
        });

        // Sort by distance (ascending)
        rankings.sort((a, b) => a.distance - b.distance);

        return {
            primaryProfile: bestMatch,
            rankings
        };
    }

    static getInterpretation(zScore: number): string {
        if (zScore >= 1.5) return "Very High";
        if (zScore >= 1.0) return "High";
        if (zScore >= -1.0) return "Average";
        return "Low";
    }
}

