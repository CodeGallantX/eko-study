import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "LASUSTECH Past Questions & Solved Papers | EkoStudy",
  description:
    "Download free LASUSTECH past questions, solved exam papers, and lecture notes on EkoStudy. Get structured study materials and AI-powered assistance to ace your university exams with confidence.",
  keywords:
    "LASUSTECH past questions, solved past papers, free university resources, EkoStudy study materials, Nigerian university exams, LASUSTECH solved past questions, free exam papers, LASUSTECH students, past exam questions and answers, revision materials, online study tools, higher institution past papers, best Nigerian study platform, AI-powered learning, LASUSTECH course syllabus, WAEC JAMB past questions, exam preparation resources, free PDF past questions, online university revision tools, academic success in Nigeria",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/resources/Past-Questions",
    title: "LASUSTECH Past Questions & Solved Papers | EkoStudy",
    description:
      "Download free LASUSTECH past questions, solved exam papers, and lecture notes on EkoStudy. Get structured study materials and AI-powered assistance to ace your university exams with confidence.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Resources-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LASUSTECH Past Questions & Solved Papers | EkoStudy",
    description:
      "Download free LASUSTECH past questions, solved exam papers, and lecture notes on EkoStudy. Get structured study materials and AI-powered assistance to ace your university exams with confidence.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Resources-banner.png"],
  },
};

type PastQuestionsLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: PastQuestionsLayoutProps) {
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
