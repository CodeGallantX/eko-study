import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";

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

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "EkoStudy: Your Gateway to Academic Excellence at LASUSTECH",
  description:
    "EkoStudy is the ultimate online resource for students of Lagos State University of Science and Technology (LASUSTECH), Ikorodu; offering an extensive collection of lecture notes, study guides, and interactive courses across various departments. Designed to support and enhance academic success, EkoStudy provides everything you need to excel in your studies, from comprehensive materials to engaging learning tools.",
  keywords:
    "LASUSTECH study resources, lecture notes LASUSTECH, LASUSTECH online study materials, EkoStudy LASUSTECH, LASUSTECH interactive courses, past questions LASUSTECH, AI study tools LASUSTECH, LASUSTECH academic support, LASUSTECH study guides, LASUSTECH exam preparation, LASUSTECH learning platform, science and technology study resources, LASUSTECH seamless learning, LASUSTECH academic success, LASUSTECH structured learning, LASUSTECH educational resources, LASUSTECH student empowerment, online lecture notes LASUSTECH, Ikorodu LASUSTECH resources, LASUSTECH course materials, LASUSTECH academic excellence, LASUSTECH study tools, interactive learning LASUSTECH, EkoStudy course offerings, LASUSTECH department study aids, LASUSTECH study plans, LASUSTECH digital learning",
  metadataBase: new URL("https://eko-study.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/",
    title: "EkoStudy: Your Gateway to Academic Excellence at LASUSTECH",
    description:
      "EkoStudy is the premier online platform tailored for LASUSTECH students. Offering a comprehensive collection of lecture notes, study materials, and interactive courses across various departments, EkoStudy is designed to enhance your learning experience. Stay updated with the latest lectures, master critical concepts, and prepare effectively for your Computer-Based Tests (CBTs). Join your peers on EkoStudy to elevate your academic journey and achieve your educational goals with ease and confidence.",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EkoStudy: Your Gateway to Academic Excellence at LASUSTECH",
    description:
      "EkoStudy is the premier online platform tailored for LASUSTECH students. Offering a comprehensive collection of lecture notes, study materials, and interactive courses across various departments, EkoStudy is designed to enhance your learning experience. Stay updated with the latest lectures, master critical concepts, and prepare effectively for your Computer-Based Tests (CBTs). Join your peers on EkoStudy to elevate your academic journey and achieve your educational goals with ease and confidence.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png"],
  },
};


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      {/* Google Analytics */}
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
      <body className={`${outfit.variable} ${merriweather.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
