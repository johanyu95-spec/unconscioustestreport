import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, resultId, pdfData } = body;

        console.log("---------------------------------------------------");
        console.log("📧 [MOCK EMAIL SERVICE] Sending Email...");
        console.log(`To: ${email}`);
        console.log(`Subject: PAIMA 심리 테스트 결과 도착`);
        console.log(`Result ID: ${resultId}`);
        console.log(`Has PDF Attachment: ${!!pdfData}`);
        console.log("---------------------------------------------------");

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: "Email sent successfully (Mock)" });

    } catch (error) {
        console.error("Email API Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
