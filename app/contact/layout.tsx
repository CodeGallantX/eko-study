import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "Contact EkoStudy - Support, Inquiries & Assistance",
  description:
    "Need help with EkoStudy? Contact us for academic support, student inquiries, technical assistance, and feedback. We’re here to help LASUSTECH students succeed.",
  keywords:
    "contact EkoStudy, LASUSTECH support, student inquiries, academic assistance, help desk, educational support, university help center, technical support, EkoStudy customer service, student guidance, contact education platform, online learning help",
  openGraph: {
    type: "website",
    url: "https://eko-study.vercel.app/contact",
    title: "Contact EkoStudy - Support, Inquiries & Assistance",
    description:
      "Need help with EkoStudy? Contact us for academic support, student inquiries, technical assistance, and feedback. We’re here to help LASUSTECH students succeed.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/contact-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact EkoStudy - Support, Inquiries & Assistance",
    description:
      "Need help with EkoStudy? Contact us for academic support, student inquiries, technical assistance, and feedback. We’re here to help LASUSTECH students succeed.",
    images: ["https://ik.imagekit.io/mshcgnjju/EkoStudy/contact-banner.png"],
  },
};

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
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
