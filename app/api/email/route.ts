import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, resultId, pdfData } = body;

        // 0. Update DB with Email (if resultId is provided)
        if (resultId && resultId !== 'unknown' && resultId !== 'mock-id') {
            try {
                // Dynamic import to avoid edge edge cases if any, though usually fine
                const { PrismaClient } = await import('@prisma/client');
                const prisma = new PrismaClient();

                await prisma.testResult.update({
                    where: { id: resultId },
                    data: { email: email } // Save the collected email
                });
                // Disconnect ideally, or rely on pooling
            } catch (dbError) {
                console.error("⚠️ Failed to update email in DB:", dbError);
                // Continue to send email even if DB update fails? 
                // User requirement: "Save to DB". So we should log this clearly.
            }
        }

        // 1. Check for Credentials
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;

        if (!user || !pass) {
            console.warn("⚠️ [Email API] Missing EMAIL_USER or EMAIL_PASS env vars. Falling back to Mock.");
            console.log(`[Mock] Sending to: ${email}, ID: ${resultId}, PDF Present: ${!!pdfData}`);

            // Mock Success Response
            return NextResponse.json({
                success: true,
                message: "이메일 전송이 완료되었습니다. (테스트 환경: 실제 발송되지 않음)"
            });
        }

        // 2. Configure Transporter (Gmail standard)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass }
        });

        // 3. Attachments Logic
        const attachments = [];
        if (pdfData) {
            // Remove data URI prefix if present (e.g. "data:application/pdf;base64,")
            const base64Content = pdfData.replace(/^data:application\/pdf;base64,/, "");
            attachments.push({
                filename: 'PAIMA_Analysis_Report.pdf',
                content: base64Content,
                encoding: 'base64'
            });
        }

        // 4. Send Email
        const mailOptions = {
            from: `"ΛMPD" <${user}>`,
            to: email,
            subject: `[ΛMPD] 무의식 심층 분석 리포트가 도착했습니다`,
            html: `
                <div style="font-family: 'Helvetica', 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1a1a1a;">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="font-size: 24px; font-weight: 900; letter-spacing: -0.5px; margin: 0;">ΛMPD</h1>
                        <p style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Unconscious Pattern Discovery</p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h2 style="font-size: 18px; line-height: 1.5; margin-bottom: 20px;">안녕하세요, <span style="color: #2563eb;">참여자님.</span></h2>
                        <p style="font-size: 14px; line-height: 1.8; color: #4a4a4a; margin-bottom: 15px;">
                            자신의 깊은 내면을 마주하기 위해 귀한 시간을 내어주셔서 진심으로 감사합니다.<br/>
                            ΛMPD(람프드)는 당신이 알지 못했던 무의식의 패턴을 발견하고,<br/>
                            더 나은 삶의 방향으로 통합하도록 돕습니다.
                        </p>
                        <p style="font-size: 14px; line-height: 1.8; color: #4a4a4a;">
                            첨부된 <strong>심층 분석 리포트</strong>에는 당신의 페르소나와 그림자,<br/>
                            그리고 2026년을 위한 구체적인 액션 플랜이 담겨 있습니다.<br/>
                            이 결과가 당신의 성장에 작은 불씨가 되기를 바랍니다.
                        </p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; text-align: center; margin: 40px 0;">
                        <p style="font-size: 12px; color: #6c757d; margin: 0 0 5px 0;">YOUR ANALYSIS ID</p>
                        <p style="font-size: 16px; font-weight: bold; color: #212529; margin: 0; letter-spacing: 1px;">${resultId}</p>
                    </div>

                    <div style="border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center;">
                        <p style="font-size: 11px; color: #adb5bd; margin: 0;">
                            © 2024 ΛMPD. All rights reserved.<br/>
                            본 메일은 발신 전용입니다.
                        </p>
                    </div>
                </div>
            `,
            attachments: attachments
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.messageId);

        return NextResponse.json({ success: true, message: "Email sent successfully" });

    } catch (error) {
        console.error("❌ Email API Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
