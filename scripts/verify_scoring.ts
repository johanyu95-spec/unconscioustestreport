
import { calculatePaimaScores } from '../lib/scoring';

const mockImplicit = { 'img1_q1': 5, 'img1_q2': 5, 'img1_q3': 5, 'img1_q4': 5, 'img1_q5': 5, 'img1_q6': 5 }; // Neutral
const mockExplicit = { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3 }; // Neutral (3 -> 2 in 0-4 scale)
const mockWellbeing = { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3, 11: 3, 12: 3, 13: 3, 14: 3, 15: 3, 16: 3, 17: 3 };

// Base Case: No IAT
const baseResult = calculatePaimaScores({
    implicitAnswers: mockImplicit,
    explicitAnswers: mockExplicit,
    wellbeingAnswers: mockWellbeing
});

console.log('--- BASE ---');
console.log('Z_N_Auto:', baseResult.Z_N_Auto);
console.log('Z_PSCI:', baseResult.Z_PSCI);

// Case 1: Healthy IAT (Faster at Acceptance)
// Block A (24-64) = 500ms, Block B (74-114) = 800ms. Diff = +300ms. Z_IAT = +2.0.
const healthyTimes = new Array(114).fill(0);
healthyTimes.fill(500, 24, 64);
healthyTimes.fill(800, 74, 114);

const healthyResult = calculatePaimaScores({
    implicitAnswers: mockImplicit,
    explicitAnswers: mockExplicit,
    wellbeingAnswers: mockWellbeing,
    iatAnswers: healthyTimes
});

console.log('--- HEALTHY (IAT +2.0) ---');
console.log('Z_N_Auto:', healthyResult.Z_N_Auto); // Should be higher
console.log('Z_PSCI:', healthyResult.Z_PSCI);

// Case 2: Repressed IAT (Faster at Oppression)
// Block A (24-64) = 800ms, Block B (74-114) = 500ms. Diff = -300ms. Z_IAT = -2.0.
const repressedTimes = new Array(114).fill(0);
repressedTimes.fill(800, 24, 64);
repressedTimes.fill(500, 74, 114);

const repressedResult = calculatePaimaScores({
    implicitAnswers: mockImplicit,
    explicitAnswers: mockExplicit,
    wellbeingAnswers: mockWellbeing,
    iatAnswers: repressedTimes
});

console.log('--- REPRESSED (IAT -2.0) ---');
console.log('Z_N_Auto:', repressedResult.Z_N_Auto); // Should be lower
console.log('Z_PSCI:', repressedResult.Z_PSCI); // Should be higher (Conflict increased)

if (repressedResult.Z_N_Auto < baseResult.Z_N_Auto && repressedResult.Z_PSCI > baseResult.Z_PSCI) {
    console.log('SUCCESS: Logic verified.');
} else {
    console.error('FAILURE: Logic did not produce expected changes.');
}
