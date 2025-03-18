import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Departments - EkoStudy",
  description:
    "Explore LASUSTECH departments on EkoStudy. Find courses, resources, and academic support tailored to your department.",
  keywords:
    "Departments EkoStudy, LASUSTECH departments, student inquiries, academic assistance, educational resources, university departments, study support, higher education",
  openGraph: {
    title: "Departments - EkoStudy",
    description:
      "Explore LASUSTECH departments on EkoStudy. Find courses, resources, and academic support tailored to your department.",
    url: "https://eko-study.vercel.app/academics/departments",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/Departments-banner.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy Departments Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Departments - EkoStudy",
    description:
      "Explore LASUSTECH departments on EkoStudy. Find courses, resources, and academic support tailored to your department.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Departments-banner.png"],
  },
};

type DepartmentsLayoutProps = {
  children: ReactNode;
};

export default function DepartmentsLayout({ children }: DepartmentsLayoutProps) {
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
