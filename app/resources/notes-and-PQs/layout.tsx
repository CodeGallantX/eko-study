import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "Free Lecture Notes & Past Questions - EkoStudy LASUSTECH",
  description:
    "Access free LASUSTECH lecture notes, past questions, and study materials on EkoStudy. Get the best university resources, solved exam papers, and AI-powered academic assistance to help you succeed in your studies.",
  keywords:
    "LASUSTECH past questions, free lecture notes, university study materials, EkoStudy resources, Nigerian university exams, solved past questions, academic support, LASUSTECH students, free past questions and answers, university revision materials, online study tools, WAEC JAMB resources, higher institution notes, free educational resources in Nigeria, school exam preparation, best Nigerian study platform, AI-powered learning, e-learning Nigeria, LASUSTECH course syllabus, study for university exams, free PDF lecture notes",
};


type ResourcesLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: ResourcesLayoutProps) {
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
        <meta property="og:url" content="https://ekostudy.vercel.app/Resources" />
        <meta property="og:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/Resources-banner.png" />

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/Resources-banner.png" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
