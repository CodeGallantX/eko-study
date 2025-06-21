import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from '@/providers/Providers'
import SupabaseProvider  from '@/providers/SupabaseProvider'
import CookieProvider from '@/providers/CookieProvider'

// Configure fonts with fallback
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

// type RootLayoutProps = {
//   children: ReactNode;
// };

export const metadata = {
  title: "EkoStudy | Centralized Learning & Study Tools for Nigerian University Students",
  description:
    "EkoStudy offers curated academic resources, structured course materials, past questions, and AI-powered assistance to help Nigerian university students study efficiently and succeed. Built to support departmental learning, real-time collaboration, and personalized academic planning.",
  keywords:
  "lecture notes Nigeria, Nigerian university past questions, university course outlines, academic support platform Nigeria, Nigerian e-learning tools, CBT practice Nigeria, AI study assistant, AI tutor Nigeria, Nigerian student portal, study app for Nigerian students, university exam prep tools, undergraduate academic planner, departmental study groups, personalized study dashboard, Nigerian university timetable, free school notes Nigeria, academic materials Nigeria, Nigerian student collaboration, best learning platform Nigeria, LASUSTECH course materials, LASUSTECH past papers, LASUSTECH tutorials, university revision guides Nigeria, smart study tools, Nigerian student GPA calculator, course-based learning Nigeria, Nigerian school dashboard, e-learning for undergraduates Nigeria, student productivity tools Nigeria, Nigerian academic portal, AI for education Nigeria, virtual classroom Nigeria, Nigerian student-focused platform, mobile learning Nigeria, exam preparation tools Nigeria, collaborative study Nigeria, university academic calendar Nigeria, online tutorials Nigeria, LASUSTECH CBT, university group chat Nigeria, online lecture access Nigeria, Nigerian student learning hub, university study resources Nigeria, AI-powered learning Nigeria, structured learning Nigeria, Nigerian university assignments, digital study assistant Nigeria, academic tools Nigeria, Nigerian student education tools, LASUSTECH academic tools, school note-sharing platform, Nigerian course management system, student-friendly learning platform, effective study platform Nigeria",
  metadataBase: new URL("https://eko-study.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/",
    title: "EkoStudy | Centralized Learning & Study Tools for Nigerian University Students",
    description:
      "Access structured academic tools, free departmental resources, past questions, lecture notes, and personalized study support. EkoStudy empowers students across Nigerian universities to stay organized, learn effectively, and collaborate through department-specific communities.",
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
    title: "EkoStudy | Academic Support Platform for Nigerian Students",
    description:
      "EkoStudy provides course-level materials, past papers, timetables, and study groups for Nigerian university students. Start strong, stay on track, and finish with confidence.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png"],
  },
  alternates: {
    canonical: "https://eko-study.vercel.app/",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
      <body className="antialiased">
        <Providers>
          <SupabaseProvider>
              <CookieProvider>
                {children}
                <Analytics />
                <SpeedInsights />
              </CookieProvider>
            <Toaster />
          </SupabaseProvider>
        </Providers>
      </body>
    </html>
  );
}