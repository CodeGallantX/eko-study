import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "EkoStudy Products & Student Tools | Academic Assist Apps",
  description:
    "Explore EkoStudy's affiliated apps designed to help LASUSTECH students excel. From StatEase (a powerful statistics solver) to graph plotters and AI-driven study tools, discover the best academic assistance platforms.",
  keywords:
    "EkoStudy products, LASUSTECH academic tools, student apps, statistics solver, graph plotter, AI study assistant, best educational apps for university students, academic support tools, student productivity apps, Nigerian university resources, online learning tools, study enhancement software, free academic apps, AI-powered study tools, LASUSTECH study aids, essential student software",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/resources/products",
    title: "EkoStudy Products & Student Tools | Academic Assist Apps",
    description:
      "Explore EkoStudy's affiliated apps designed to help LASUSTECH students excel. From StatEase (a powerful statistics solver) to graph plotters and AI-driven study tools, discover the best academic assistance platforms.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Products-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EkoStudy Products & Student Tools | Academic Assist Apps",
    description:
      "Explore EkoStudy's affiliated apps designed to help LASUSTECH students excel. From StatEase (a powerful statistics solver) to graph plotters and AI-driven study tools, discover the best academic assistance platforms.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/Products-banner.png"],
  },
};

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
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
