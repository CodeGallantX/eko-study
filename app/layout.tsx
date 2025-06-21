import { Outfit, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next"
import { Providers } from '@/providers/Providers' 

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

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "EkoStudy: Your Gateway to Academic Excellence at LASUSTECH",
  description:
    "Access free lecture notes, past questions, course outlines, exam guides, and AI-powered study support designed for Lagos State University of Science and Technology (LASUSTECH). Join thousands of students using EkoStudy to stay ahead with departmental resources, updated timetables, real-time group chats, and a personalized dashboard. Study smarter, pass easier, and graduate stronger — all in one platform tailored to your academic journey.",
  keywords:
    "LASUSTECH, Lagos State University of Science and Technology, LASUSTECH students, LASUSTECH courses, LASUSTECH past questions, LASUSTECH lecture notes, LASUSTECH study materials, LASUSTECH timetable, LASUSTECH exam guide, LASUSTECH departments, LASUSTECH college of science, LASUSTECH college of engineering, LASUSTECH college of agriculture, LASUSTECH admission, LASUSTECH portal, LASUSTECH fresher guide, LASUSTECH updates, LASUSTECH general studies, LASUSTECH school news, EkoStudy platform, EkoStudy AI tutor, EkoStudy LASUSTECH, best study platform for LASUSTECH, Nigerian university study app, Nigerian student learning platform, Nigerian school notes app, LASUSTECH exam prep, study for LASUSTECH exams, free lecture notes Nigeria, online learning LASUSTECH, LASUSTECH academic calendar, online learning platform for LASUSTECH, LASUSTECH CBT practice, CBT practice for LASUSTECH, free academic materials LASUSTECH, study tips for LASUSTECH, LASUSTECH departmental resources, university learning platform Nigeria, study portal LASUSTECH, academic help LASUSTECH, best LASUSTECH website, AI learning assistant LASUSTECH, past questions and answers LASUSTECH, AI-powered study app, university academic support Nigeria, LASUSTECH course outline, online exam preparation Nigeria, LASUSTECH tutorials, e-learning platform Nigeria, free tutorials LASUSTECH, LASUSTECH e-library, university notes platform Nigeria, LASUSTECH virtual classroom, LASUSTECH school forum, LASUSTECH campus groups, department-based learning app, LASUSTECH faculty access, educational app for Nigerian students, smart study app Nigeria, Nigerian university timetable app, lecture timetable LASUSTECH, university past papers Nigeria, online courseware LASUSTECH, LASUSTECH revision guide, LASUSTECH assessment platform, LASUSTECH school tools, smart study tools for LASUSTECH, eko study notes, LASUSTECH GPA calculator, academic tools Nigeria, Nigerian university student resources, best academic app Nigeria, AI assistant for university students, LASUSTECH learning hub, free learning tools Nigeria, academic community LASUSTECH, online group study LASUSTECH, collaborative learning Nigeria, digital learning Nigeria, remote learning Nigeria, LASUSTECH online platform, school app for LASUSTECH, course-based resources LASUSTECH, LASUSTECH general group, student collaboration LASUSTECH, top Nigerian university apps, student life at LASUSTECH, LASUSTECH e-learning tools, AI chatbot for students Nigeria, Nigerian education platform, LASUSTECH student dashboard, LASUSTECH admin dashboard, mobile learning LASUSTECH, academic support tools Nigeria, AI for Nigerian schools, AI education Nigeria, intelligent study assistant LASUSTECH, LASUSTECH project topics, undergraduate resources Nigeria, best AI tutor for university, custom learning Nigeria, Nigerian academic platform, school assignment support Nigeria",
  metadataBase: new URL("https://eko-study.vercel.app/"),
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/",
    title: "EkoStudy: Your Gateway to Academic Excellence at LASUSTECH",
    description:
      "Access free lecture notes, past questions, course outlines, exam guides, and AI-powered study support designed for Lagos State University of Science and Technology (LASUSTECH). Join thousands of students using EkoStudy to stay ahead with departmental resources, updated timetables, real-time group chats, and a personalized dashboard. Study smarter, pass easier, and graduate stronger — all in one platform tailored to your academic journey.",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
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
            {children}
            <Analytics/>
            <Toaster />
        </Providers>
      </body>
    </html>
  );
}