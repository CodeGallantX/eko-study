import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "EkoStudy Blog - Insights, Tips & Resources",
  description:
    "Stay updated with the latest academic insights, study tips, and student resources from EkoStudy. Explore articles on LASUSTECH courses, exam prep, and learning strategies.",
  keywords:
    "EkoStudy blog, LASUSTECH articles, student study tips, academic resources, learning strategies, university guides, exam preparation, educational insights, college blog",
};

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
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
        <meta property="og:url" content="https://ekostudy.vercel.app/blog" />
        <meta property="og:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/blog-banner.png" />

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/blog-banner.png" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
