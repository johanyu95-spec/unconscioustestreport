
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { scores, answers, email, profileKey } = body;

        console.log('API /result/save received:', { email, profileKey, scoreKeys: Object.keys(scores || {}) });

        if (!scores || !answers) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Map Frontend Scores (Z_ case) to DB Fields (z_ case)
        const metricData = {
            z_iM_Ach: scores.Z_iM_Ach ?? scores.z_iM_Ach,
            z_iM_Pow: scores.Z_iM_Pow ?? scores.z_iM_Pow,
            z_iM_Aff: scores.Z_iM_Aff ?? scores.z_iM_Aff,
            z_eM_Ach: scores.Z_eM_Ach ?? scores.z_eM_Ach,
            z_eM_Pow: scores.Z_eM_Pow ?? scores.z_eM_Pow,
            z_eM_Aff: scores.Z_eM_Aff ?? scores.z_eM_Aff,
            z_MDI_Ach: scores.Z_MDI_Ach ?? scores.z_MDI_Ach,
            z_MDI_Pow: scores.Z_MDI_Pow ?? scores.z_MDI_Pow,
            z_MDI_Aff: scores.Z_MDI_Aff ?? scores.z_MDI_Aff,
            z_PSCI: scores.Z_PSCI ?? scores.z_PSCI,
            z_N_Auto: scores.Z_N_Auto ?? scores.z_N_Auto,
            z_N_Comp: scores.Z_N_Comp ?? scores.z_N_Comp,
            z_N_Rela: scores.Z_N_Rela ?? scores.z_N_Rela,
            z_W_Wellbeing: scores.Z_W_Wellbeing ?? scores.z_W_Wellbeing,
            z_C_Depletion: scores.Z_C_Depletion ?? scores.z_C_Depletion,
            z_C_External: scores.Z_C_External ?? scores.z_C_External,

            profileKey: profileKey || 'UNKNOWN'
        };

        let userId = null;

        // If email provided, upsert User
        if (email) {
            const user = await prisma.user.upsert({
                where: { email },
                update: {}, // Don't overwrite existing user fields for now
                create: {
                    email,
                    name: 'Unknown' // Default
                }
            });
            userId = user.id;
            console.log('Linked to User:', userId);
        }

        const result = await prisma.testResult.create({
            data: {
                answers: answers as any, // Json
                email: email || null,
                userId: userId, // Link to User
                metric: {
                    create: metricData
                }
            },
            include: {
                metric: true
            }
        });

        return NextResponse.json({ success: true, id: result.id });
    } catch (error) {
        console.error('Save Error:', error);
        return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
    }
}
