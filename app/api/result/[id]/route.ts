import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Use context for dynamic route params in Next.js 15/App Router
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params is a Promise in newer Next.js versions often, but check version. Assuming std generic.
    // Actually safe to await params.
) {
    try {
        const { id } = await params;

        const result = await prisma.testResult.findUnique({
            where: { id },
        });

        if (!result) {
            return NextResponse.json({ error: 'Result not found' }, { status: 404 });
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { analysis } = body; // Update analysis mainly

        const result = await prisma.testResult.update({
            where: { id },
            data: {
                analysis
            }
        });

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Update Error:', error);
        return NextResponse.json({ error: 'Failed to update result' }, { status: 500 });
    }
}
