import Head from "next/head";
import { ReactNode } from "react";

export const metadata = {
  title: "Courses - EkoStudy",
  description:
    "Get in touch with EkoStudy for support, inquiries, or feedback. We are here to help LASUSTECH students with all their academic needs.",
  keywords:
    "Courses EkoStudy, LASUSTECH support, student inquiries, academic assistance, help desk, educational support",
};

type CoursesLayoutProps = {
  children: ReactNode;
};

export default function CoursesLayout({ children }: CoursesLayoutProps) {
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
        <meta property="og:url" content="https://ekostudy.vercel.app/Courses" />
        <meta property="og:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/Courses-banner.png" />

        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/Courses-banner.png" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
