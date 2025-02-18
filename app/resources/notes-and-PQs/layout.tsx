import Head from "next/head";
import { ReactNode } from "react";

export const metadata = {
  title: "Resources EkoStudy - Our Mission & Vision",
  description:
    "Learn Resources EkoStudy’s mission to empower LASUSTECH students with top-quality academic resources, interactive learning tools, and expert study support.",
  keywords:
    "Resources EkoStudy, EkoStudy mission, LASUSTECH education platform, student learning resources, academic support, study tools, online education, university success, learning innovation",
};

type ResourcesLayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: ResourcesLayoutProps) {
  return (
    <html lang="en">
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
