import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "EkoStudy - The Ultimate Academic Hub",
  description: "EkoStudy is a full-stack online learning platform for LASUSTECH students, providing lecture notes, study guides, and interactive courses.",
  keywords: "EkoStudy, LASUSTECH, online learning, study guides, courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${onest.variable} antialiased bg-background text-black`}>{children}</body>
    </html>
  );
}