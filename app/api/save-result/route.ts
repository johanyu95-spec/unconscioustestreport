import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabaseClient';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            email,
            username,
            profileKey,
            profileName,
            explicitScores,
            implicitScores,
            aiAnalysis
        } = body;

        // Validation
        if (!profileKey) {
            return NextResponse.json({ error: "Missing profileKey" }, { status: 400 });
        }

        // Insert into Supabase
        const { data, error } = await supabase
            .from('user_results')
            .insert([
                {
                    email: email || null,
                    username: username || 'Anonymous',
                    profile_key: profileKey,
                    profile_name: profileName || null,
                    explicit_scores: explicitScores || {},
                    implicit_scores: implicitScores || {},
                    ai_analysis_summary: JSON.stringify(aiAnalysis),
                    metadata: { source: 'web_report_flow' }
                }
            ])
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Save Result Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
