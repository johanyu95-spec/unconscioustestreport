
import { calculatePaimaScores } from '../lib/scoring';
import { determineDetailedProfile } from '../lib/profiling';

console.log('--- Spec Verification (Retry) ---');

const iatRepressed = new Array(114).fill(0);
iatRepressed.fill(500, 24, 64);
iatRepressed.fill(800, 74, 114);

const implicitHigh = {};
for (let i = 1; i <= 6; i++) {
    // Explicit concatenation to avoid template literal issues in generation
    implicitHigh['img' + i + '_q1'] = 8; implicitHigh['img' + i + '_q2'] = 2;
    implicitHigh['img' + i + '_q3'] = 2; implicitHigh['img' + i + '_q4'] = 2;
    implicitHigh['img' + i + '_q5'] = 2; implicitHigh['img' + i + '_q6'] = 2;
}

const explicitLowAch = { 0: 2, 1: 2, 2: 2, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 };
const wbLow = {};
for (let i = 0; i < 18; i++) wbLow[i] = 2;
wbLow[16] = 4; // Depletion High

const scores = calculatePaimaScores({
    implicitAnswers: implicitHigh,
    explicitAnswers: explicitLowAch,
    wellbeingAnswers: wbLow,
    iatAnswers: iatRepressed
});

console.log('Z_PSCI (D-Score):', scores.Z_PSCI);
console.log('Z_iM_Ach:', scores.Z_iM_Ach); // Expect 1.2
console.log('Z_eM_Ach:', scores.Z_eM_Ach); // Expect -1
console.log('Z_MDI_Ach:', scores.Z_MDI_Ach); // Expect 2.2
console.log('Proflle:', determineDetailedProfile(scores));
