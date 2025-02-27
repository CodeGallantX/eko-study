import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "Courses & Study Materials - EkoStudy",
  description:
    "Discover LASUSTECH courses, lecture notes, past questions, and AI-powered study resources on EkoStudy. Get personalized academic support, smart study recommendations, and exam preparation tools to boost your performance.",
  keywords:
    "LASUSTECH courses, EkoStudy study materials, lecture notes, past questions, exam preparation, AI tutoring, university resources, student academic support, online learning platform, LASUSTECH education, study tips, course syllabus, free educational materials, digital learning, student success, personalized study plans, academic excellence, university exam help, AI-powered study assistant, efficient learning, higher education resources",
};

type CoursesLayoutProps = {
  children: ReactNode;
};

export default function CoursesLayout({ children }: CoursesLayoutProps) {
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
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ekostudy.vercel.app/Courses" />
        <meta property="og:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/Courses-banner.png" />

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/Courses-banner.png" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
