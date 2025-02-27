import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "About EkoStudy - Our Mission & Vision",
  description:
    "Learn about EkoStudy’s mission to empower LASUSTECH students with top-quality academic resources, interactive learning tools, and expert study support.",
  keywords:
    "About EkoStudy, EkoStudy mission, LASUSTECH education platform, student learning resources, academic support, study tools, online education, university success, learning innovation",
};

type AboutLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: AboutLayoutProps) {
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
        <meta property="og:url" content="https://ekostudy.vercel.app/about" />
        <meta property="og:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/about-banner.png" />

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/about-banner.png" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
