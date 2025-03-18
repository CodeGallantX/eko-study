import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "EkoStudy Tutorials | Find Free & Paid Study Sessions",
  description:
    "Discover live tutorial sessions at LASUSTECH! Stay updated on free and paid study sessions, locations, and times. Get academic support tailored to your needs.",
  keywords:
    "EkoStudy tutorials, LASUSTECH study groups, free tutorials, paid tutoring sessions, student academic support, university tutorial schedule, best study groups for LASUSTECH students, academic assistance, campus tutoring, extra lessons, live tutorials, lecture help, paid study classes, exam prep sessions, group study locations, university study meetups",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/academics/tutorials",
    title: "EkoStudy Tutorials | Find Free & Paid Study Sessions",
    description:
      "Discover live tutorial sessions at LASUSTECH! Stay updated on free and paid study sessions, locations, and times. Get academic support tailored to your needs.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Tutorials-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EkoStudy Tutorials | Find Free & Paid Study Sessions",
    description:
      "Discover live tutorial sessions at LASUSTECH! Stay updated on free and paid study sessions, locations, and times. Get academic support tailored to your needs.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Tutorials-banner.png"],
  },
};

type TutorialsLayoutProps = {
  children: ReactNode;
};

export default function TutorialsLayout({ children }: TutorialsLayoutProps) {
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
