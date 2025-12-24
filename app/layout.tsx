import type { Metadata } from "next";
import { Inter, Noto_Serif, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-serif-kr",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRISM Lab : 무의식 심층 분석 검사",
  description: "0.1초의 무의식적 반응과 투사적 이미지를 통해 당신의 숨겨진 본성을 발견하세요. 소프트 런칭 기념 심층 분석 리포트 무료 제공 이벤트 진행 중.",
  icons: {
    icon: "/images/logo_lm_pd.png",
    shortcut: "/images/logo_lm_pd.png",
    apple: "/images/logo_lm_pd.png",
  },
  openGraph: {
    title: "PRISM Lab : 당신의 무의식은 어떤 빛깔인가요?",
    description: "말보다 정직한 0.1초의 반응. PRISM Lab에서 나조차 몰랐던 나의 진짜 모습을 확인해보세요. [소프트 런칭 기념 무료 분석 진행 중]",
    images: [
      {
        url: "/images/logo_lm_pd.png",
        width: 800,
        height: 600,
        alt: "PRISM Lab Logo",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${notoSerif.variable} ${notoSansKR.variable} ${notoSerifKR.variable} antialiased font-sans-kr bg-[#F5F5F7] text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
