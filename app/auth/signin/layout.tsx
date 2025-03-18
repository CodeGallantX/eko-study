import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
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
  title: "Sign In | EkoStudy - Ultimate LASUSTECH Study Hub",
  description:
    "EkoStudy is the #1 online academic resource for LASUSTECH students, offering lecture notes, past questions, study guides, and AI-powered tutoring for academic excellence.",
  keywords:
    "EkoStudy, LASUSTECH study materials, LASUSTECH lecture notes, past questions LASUSTECH, university study resources, academic success, AI tutoring, online education platform, free university resources, best study platform Nigeria, LASUSTECH student hub, study guides, exam preparation, interactive learning, AI-powered study assistant, online university resources, educational technology, e-learning, student academic support, LASUSTECH online courses.",
  authors: [{ name: "John Samuel" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/auth/signin",
    title: "EkoStudy - The Ultimate Academic Hub for LASUSTECH Students",
    description:
      "EkoStudy provides LASUSTECH students with high-quality lecture notes, past exam questions, AI-driven study assistance, and personalized learning tools.",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy - The Ultimate Study Hub for LASUSTECH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EkoStudy - The Ultimate Academic Hub for LASUSTECH Students",
    description:
      "Join EkoStudy for LASUSTECH study resources, past questions, lecture notes, AI tutoring, and smart study tools for academic success.",
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
        {/* Google Analytics Tracking */}
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
        {children}
      </body>
    </html>
  );
}
