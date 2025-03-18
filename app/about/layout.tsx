import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "About EkoStudy - Transforming Learning for LASUSTECH Students",
  description:
    "Discover EkoStudy’s mission to revolutionize education at LASUSTECH. We provide AI-powered study tools, lecture notes, past questions, and personalized learning resources to help students excel in their academics and career paths.",
  keywords:
    "EkoStudy, about EkoStudy, LASUSTECH education, LASUSTECH study platform, online learning, academic resources, AI-powered study tools, LASUSTECH past questions, university study materials, personalized learning, LASUSTECH students, best study platform, digital learning, e-learning for LASUSTECH, study aids, academic success, LASUSTECH online resources, university learning tools, educational support, student success, lecture notes LASUSTECH, digital education, smart learning platform",
  openGraph: {
    title: "About EkoStudy - Transforming Learning for LASUSTECH Students",
    description:
      "Discover EkoStudy’s mission to revolutionize education at LASUSTECH with AI-powered study tools, lecture notes, past questions, and more.",
    url: "https://ekostudy.vercel.app/about",
    type: "website",
    images: [
      {
        url: "https://ik.imagekit.io/mshcgnjju/EkoStudy/about-banner.png",
        width: 1200,
        height: 630,
        alt: "EkoStudy About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About EkoStudy - Transforming Learning for LASUSTECH Students",
    description:
      "Discover EkoStudy’s mission to revolutionize education at LASUSTECH with AI-powered study tools, lecture notes, past questions, and more.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/about-banner.png"],
  },
};

type AboutLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: AboutLayoutProps) {
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
