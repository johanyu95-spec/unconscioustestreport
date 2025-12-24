const { PrismaClient } = require('@prisma/client');
const { generateAll56Profiles } = require('../scripts/generate_profiles');

const prisma = new PrismaClient();

const PROFILES = generateAll56Profiles();

async function main() {
    console.log('Start seeding ResultContent...');
    console.log('Client Path:', require.resolve('@prisma/client'));
    console.log('Prisma keys:', Object.keys(prisma));

    for (const profile of PROFILES) {
        await prisma.resultContent.upsert({
            where: { key: profile.key },
            update: profile,
            create: profile,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
