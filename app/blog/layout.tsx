import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "EkoStudy Blog - Study Hacks, Exam Tips & Academic Insights",
  description:
    "Unlock expert study strategies, exam tips, and in-depth academic insights with the EkoStudy Blog. Get the latest updates on LASUSTECH courses, study techniques, and university success strategies.",
  keywords:
    "EkoStudy blog, LASUSTECH study tips, exam success, university learning strategies, student academic resources, online study guides, college education insights, digital learning, effective study habits, academic growth",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/blog",
    title: "EkoStudy Blog - Study Hacks, Exam Tips & Academic Insights",
    description:
      "Unlock expert study strategies, exam tips, and in-depth academic insights with the EkoStudy Blog. Get the latest updates on LASUSTECH courses, study techniques, and university success strategies.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/blog-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EkoStudy Blog - Study Hacks, Exam Tips & Academic Insights",
    description:
      "Unlock expert study strategies, exam tips, and in-depth academic insights with the EkoStudy Blog. Get the latest updates on LASUSTECH courses, study techniques, and university success strategies.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/blog-banner.png"],
  },
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
      <body>{children}</body>
    </html>
  );
}
