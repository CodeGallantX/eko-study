import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Colleges - Explore LASUSTECH's Academic Divisions | EkoStudy",
  description:
    "Discover LASUSTECH's colleges and academic faculties on EkoStudy. Explore course offerings, departments, and key resources to support your educational journey.",
  keywords:
    "LASUSTECH colleges, EkoStudy colleges, university faculties, academic divisions, LASUSTECH departments, university programs, higher education, student resources, academic assistance, faculty information, college details",
  openGraph: {
    title: "Colleges - Explore LASUSTECH's Academic Divisions | EkoStudy",
    description:
      "Discover LASUSTECH's colleges and academic faculties on EkoStudy. Explore course offerings, departments, and key resources to support your educational journey.",
    url: "https://eko-study.vercel.app/academics/colleges",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/Colleges-banner.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy Colleges Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colleges - Explore LASUSTECH's Academic Divisions | EkoStudy",
    description:
      "Discover LASUSTECH's colleges and academic faculties on EkoStudy. Explore course offerings, departments, and key resources to support your educational journey.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Colleges-banner.png"],
  },
};

type CollegesLayoutProps = {
  children: ReactNode;
};

export default function CollegesLayout({ children }: CollegesLayoutProps) {
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
