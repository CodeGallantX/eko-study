import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from '@/providers/Providers'
import SupabaseProvider from '@/providers/SupabaseProvider'
import CookieProvider from '@/providers/CookieProvider'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

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

export const metadata = {
  title: "EkoStudy | Smarter Learning, Streamlined Success",
  description:
    "EkoStudy delivers curated course materials, past questions, academic tools, and real-time collaboration features—designed to elevate your learning experience and help you stay organized, confident, and exam-ready.",
  keywords:
    "university study tools, academic dashboard, past exam papers, course outlines, lecture notes, AI-powered study assistant, academic calendar, student productivity tools, collaborative learning, department-based resources, smart learning platform, structured revision, study planner, lecture archive, digital academic support, course management platform, virtual study groups, educational tools, academic success tools, intelligent learning assistant, school timetable tools, AI learning engine, student-focused edtech, academic resource hub, exam preparation platform, high-impact study tools, peer-based learning, course-driven education, modern academic app, efficient learning systems, EkoStudy, ekostudy LASUSTECH, LASUSTECH resources, LASUSTECH past questions, LASUSTECH course materials, LASUSTECH lecture notes, LASUSTECH academic support, LASUSTECH study dashboard, LASUSTECH timetable, LASUSTECH study portal, LASUSTECH learning app, LASUSTECH departmental courses, LASUSTECH academic calendar, LASUSTECH CBT practice, LASUSTECH tutorials, LASUSTECH online study, LASUSTECH revision tools, LASUSTECH e-learning, LASUSTECH exam prep, LASUSTECH lecture archive, LASUSTECH course outline, LASUSTECH digital learning, study platform LASUSTECH, LASUSTECH dashboard, university study dashboard, academic tools LASUSTECH, best LASUSTECH app, LASUSTECH student assistant, LASUSTECH course planner, LASUSTECH notes downloader, LASUSTECH semester planner, LASUSTECH study materials, LASUSTECH-focused app, school dashboard LASUSTECH, university portal LASUSTECH, academic resource platform LASUSTECH, AI tutor LASUSTECH, AI assistant LASUSTECH, AI-powered study LASUSTECH, structured learning LASUSTECH, course-based learning LASUSTECH, personalized study platform LASUSTECH, LASUSTECH exam planner, exam guide LASUSTECH, smart learning LASUSTECH, university study tools, academic dashboard, past exam papers, course outlines, lecture notes, AI-powered study assistant, academic calendar, student productivity tools, collaborative learning, department-based resources, smart learning platform, structured revision, study planner, lecture archive, digital academic support, course management platform, virtual study groups, educational tools, academic success tools, intelligent learning assistant, school timetable tools, AI learning engine, student-focused edtech, academic resource hub, exam preparation platform, high-impact study tools, peer-based learning, course-driven education, modern academic app, efficient learning systems, LASUSTECH study resources, LASUSTECH past questions, LASUSTECH course materials, LASUSTECH departmental notes, LASUSTECH revision guides, LASUSTECH academic planner, LASUSTECH timetable, LASUSTECH AI tutor, LASUSTECH student portal, LASUSTECH collaborative learning",
  metadataBase: new URL("https://eko-study.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/",
    title: "EkoStudy | Smarter Learning, Streamlined Success",
    description:
      "Discover powerful academic resources, AI-powered guidance, structured revision tools, and department-specific materials—all in one seamless platform built for focused learners.",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EkoStudy | Smarter Learning, Streamlined Success",
    description:
      "EkoStudy combines clarity, structure, and intelligent tools to transform how you prepare, revise, and collaborate. Elevate your academic journey with confidence.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png"],
  },
  alternates: {
    canonical: "https://eko-study.vercel.app/",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  // Initialize auth state but don't use session directly
  await supabase.auth.getSession()

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