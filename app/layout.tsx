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
  title: "Unconscious Test",
  description: "Discover Yourself - Canvas of Soul",
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
