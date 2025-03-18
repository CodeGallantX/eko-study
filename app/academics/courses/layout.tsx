import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Courses & Study Materials - EkoStudy",
  description:
    "Discover LASUSTECH courses, lecture notes, past questions, and AI-powered study resources on EkoStudy. Get personalized academic support, smart study recommendations, and exam preparation tools to boost your performance.",
  keywords:
    "LASUSTECH courses, EkoStudy study materials, lecture notes, past questions, exam preparation, AI tutoring, university resources, student academic support, online learning platform, LASUSTECH education, study tips, course syllabus, free educational materials, digital learning, student success, personalized study plans, academic excellence, university exam help, AI-powered study assistant, efficient learning, higher education resources",
  openGraph: {
    title: "Courses & Study Materials - EkoStudy",
    description:
      "Discover LASUSTECH courses, lecture notes, past questions, and AI-powered study resources on EkoStudy. Get personalized academic support, smart study recommendations, and exam preparation tools to boost your performance.",
    url: "https://eko-study.vercel.app/academics/courses",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/Courses-banner.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy Courses Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Courses & Study Materials - EkoStudy",
    description:
      "Discover LASUSTECH courses, lecture notes, past questions, and AI-powered study resources on EkoStudy. Get personalized academic support, smart study recommendations, and exam preparation tools to boost your performance.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Courses-banner.png"],
  },
};

type CoursesLayoutProps = {
  children: ReactNode;
};

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <html lang="en">
      <body>
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
