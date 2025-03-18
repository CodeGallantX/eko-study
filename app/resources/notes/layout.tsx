import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "Free LASUSTECH Lecture Notes & Past Questions | EkoStudy",
  description:
    "Download free LASUSTECH lecture notes, past questions, and study materials on EkoStudy. Get access to well-structured university resources, solved exam papers, and AI-powered study assistance for academic success.",
  keywords:
    "LASUSTECH past questions, free lecture notes, university study materials, EkoStudy resources, Nigerian university exams, solved past questions, academic support, LASUSTECH students, free past questions and answers, university revision materials, online study tools, WAEC JAMB resources, higher institution notes, free educational resources in Nigeria, school exam preparation, best Nigerian study platform, AI-powered learning, e-learning Nigeria, LASUSTECH course syllabus, study for university exams, free PDF lecture notes, LASUSTECH learning hub, online university resources, LASUSTECH e-library, exam preparation materials, best study platform for LASUSTECH students, online university learning tools, academic success in Nigeria",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/resources/notes",
    title: "Free LASUSTECH Lecture Notes & Past Questions | EkoStudy",
    description:
      "Download free LASUSTECH lecture notes, past questions, and study materials on EkoStudy. Get access to well-structured university resources, solved exam papers, and AI-powered study assistance for academic success.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Resources-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LASUSTECH Lecture Notes & Past Questions | EkoStudy",
    description:
      "Download free LASUSTECH lecture notes, past questions, and study materials on EkoStudy. Get access to well-structured university resources, solved exam papers, and AI-powered study assistance for academic success.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Resources-banner.png"],
  },
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
      <body>{children}</body>
    </html>
  );
}
