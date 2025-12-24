
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- Start Simulation ---');

    // 1. Create a User
    const userEmail = `sim_${Date.now()}@example.com`;
    console.log(`Creating user: ${userEmail}`);

    const user = await prisma.user.create({
        data: {
            email: userEmail,
            name: 'Simulation User',
        },
    });
    console.log('User created:', user.id);

    // 2. Create a Test Result with Metrics
    console.log('Creating TestResult...');
    const result = await prisma.testResult.create({
        data: {
            userId: user.id,
            email: userEmail,
            isPaid: true,
            answers: { simulated: true },
            metric: {
                create: {
                    z_iM_Ach: 1.5,
                    z_iM_Pow: 0.5,
                    z_iM_Aff: -0.5,
                    z_eM_Ach: 1.0,
                    z_eM_Pow: 0.0,
                    z_eM_Aff: 0.0,
                    z_MDI_Ach: 0.5,
                    z_MDI_Pow: 0.5,
                    z_MDI_Aff: -0.5,
                    z_PSCI: 60,
                    z_N_Auto: 50,
                    z_N_Comp: 50,
                    z_N_Rela: 50,
                    z_W_Wellbeing: 75,
                    z_C_Depletion: 1.5, // Trigger BURNOUT (> 1.0)
                    z_C_External: 45,
                    profileKey: 'EXHAUSTED_HERO_BURNOUT',
                },
            },
        },
        include: {
            metric: true,
        },
    });
    console.log('TestResult created:', result.id);
    console.log('Profile Key:', result.metric?.profileKey);

    // 3. Verify ResultContent Relation
    // We fetch the content using the profileKey from the metric
    if (result.metric?.profileKey) {
        const content = await prisma.resultContent.findUnique({
            where: { key: result.metric.profileKey }
        });
        console.log('Fetch ResultContent Success:', !!content);
        if (content) {
            console.log('Content Name:', content.name);
        } else {
            console.warn('WARNING: ResultContent not found for key. Seed might have failed.');
        }
    }

    console.log('--- Simulation Complete ---');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
