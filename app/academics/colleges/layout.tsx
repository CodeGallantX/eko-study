import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Colleges - Explore LASUSTECH's Academic Divisions | EkoStudy",
  description: "Discover all colleges and faculties at LASUSTECH",
  keywords: "LASUSTECH colleges, university faculties, academic divisions",
  openGraph: {
    title: "LASUSTECH Colleges",
    description: "Explore all academic colleges at LASUSTECH",
    images: [
      {
        url: "/images/colleges-banner.jpg",
        width: 1200,
        height: 630,
      }
    ]
  }
};

export default function CollegesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script 
        strategy="afterInteractive" 
        src="https://www.googletagmanager.com/gtag/js?id=G-DZMYQ5NQT0" 
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DZMYQ5NQT0');
        `}
      </Script>
      {children}
    </>
  );
}