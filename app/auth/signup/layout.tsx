import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster"
import "../../globals.css";
import { ReactNode } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata = {
  title: "Sign Up | EkoStudy - #1 Academic Platform for LASUSTECH Students",
  description:
    "Join EkoStudy, the ultimate e-learning platform for LASUSTECH students. Access free lecture notes, past exam questions, AI-powered study assistance, interactive courses, and personalized academic resources to excel in your studies.",
  keywords:
    "LASUSTECH study resources, LASUSTECH past questions, free university lecture notes, AI-powered tutoring Nigeria, LASUSTECH e-learning, online education platform, academic success tools, best study platform Nigeria, university exam prep, digital learning Nigeria, interactive courses LASUSTECH, AI study assistant, free university resources, EkoStudy LASUSTECH, online learning hub Nigeria, LASUSTECH student portal, best e-learning website Nigeria, academic excellence tools, university education online",
  authors: [{ name: "John Samuel" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/auth/signup",
    title: "Sign Up | EkoStudy - LASUSTECH's Best Online Learning Platform",
    description:
      "Unlock academic success with EkoStudy! Get free LASUSTECH lecture notes, past questions, study guides, AI-assisted learning, and structured online courses.",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy - The Ultimate Academic Hub for LASUSTECH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | EkoStudy - LASUSTECH's Best Online Learning Hub",
    description:
      "EkoStudy provides LASUSTECH students with top-quality study materials, past exam questions, AI-assisted learning, and personalized academic support.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png"],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${merriweather.variable} antialiased`}>
        {/* Google Analytics for Tracking */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-DZMYQ5NQT0" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DZMYQ5NQT0');
            `,
          }}
        />
        <div className={`${outfit.variable} ${merriweather.variable} antialiased min-h-screen`}>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}