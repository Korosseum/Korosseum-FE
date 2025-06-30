import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "사이버 VS 토론 플랫폼",
  description: "다양한 주제로 건전한 토론을 즐겨보세요 - 사이버 VS 토론 플랫폼",
  keywords: ["토론", "논쟁", "VS", "사이버토론", "온라인토론", "의견교환"],
  authors: [{ name: "Cyber VS Debate Platform Team" }],
  creator: "Cyber VS Debate Platform",
  publisher: "Cyber VS Debate Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    title: "사이버 VS 토론 플랫폼",
    description: "다양한 주제로 건전한 토론을 즐겨보세요",
    url: "https://your-domain.com",
    siteName: "사이버 VS 토론 플랫폼",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "사이버 VS 토론 플랫폼",
    description: "다양한 주제로 건전한 토론을 즐겨보세요",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className={`${inter.className} antialiased rounded`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
