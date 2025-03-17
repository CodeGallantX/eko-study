import { Outfit, Merriweather } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import "./globals.css";
import { ReactNode } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

// export const metadata = {
//   title: "EkoStudy - The Ultimate Academic Hub",
//   description:
//     "EkoStudy is the ultimate online resource for students of Lagos State University of Science and Technology (LASUSTECH), Ikorodu; offering an extensive collection of lecture notes, study guides, and interactive courses across various departments. Designed to support and enhance academic success, EkoStudy provides everything you need to excel in your studies, from comprehensive materials to engaging learning tools.",
//   keywords:
//     "LASUSTECH pre-degree, LASUSTECH departments, study resources, pre-degree exam resources, EkoStudy online courses, LASUSTECH students study platform, EkoStudy,online study resources LASUSTECH,pre-degree study guides,interactive courses for LASUSTECH students,academic success tools,comprehensive lecture notes online,study materials for LASUSTECH,EkoStudy learning tools,enhance academic performance,LASUSTECH departments study resources,online learning platform for LASUSTECH,study support for pre-degree students,EkoStudy courses,educational resources for pre-degree,LASUSTECH pre-degree preparation,LASUSTECH academic resources,LASUSTECH exam resources,LASUSTECH lecture notes,virtual learning for LASUSTECH students,study aids for LASUSTECH students,EkoStudy study guides,academic enhancement tools LASUSTECH,EkoStudy interactive learning, online academic success LASUSTECH,EkoStudy education support,departmental guides LASUSTECH,pre-degree coursework help",
// };

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
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
        <meta name="title" content="EkoStudy - The Ultimate Academic Hub" />
        <title>EkoStudy: Your Gateway to Academic Excellence at LASUSTECH</title>
<meta name="title" content="EkoStudy"/>
<meta name="description" content="EkoStudy is the ultimate online resource for students of Lagos State University of Science and Technology (LASUSTECH), Ikorodu; offering an extensive collection of lecture notes, study guides, and interactive courses across various departments. Designed to support and enhance academic success, EkoStudy provides everything you need to excel in your studies, from comprehensive materials to engaging learning tools."/>
<meta name="keywords" content="LASUSTECH study resources, lecture notes LASUSTECH, LASUSTECH online study materials, EkoStudy LASUSTECH, LASUSTECH interactive courses, past questions LASUSTECH, AI study tools LASUSTECH, LASUSTECH academic support, LASUSTECH study guides, LASUSTECH exam preparation, LASUSTECH learning platform, science and technology study resources, LASUSTECH seamless learning, LASUSTECH academic success, LASUSTECH structured learning, LASUSTECH educational resources, LASUSTECH student empowerment, online lecture notes LASUSTECH, Ikorodu LASUSTECH resources, LASUSTECH course materials, LASUSTECH academic excellence, LASUSTECH study tools, interactive learning LASUSTECH, EkoStudy course offerings, LASUSTECH department study aids, LASUSTECH study plans, LASUSTECH digital learning"/>
<meta name="robots" content="index, follow"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="language" content="English"/>
<meta name="author" content="John Samuel"/>

<meta name="title" content="EkoStudy: Your Gateway to Academic Excellence at LASUSTECH" />
<meta name="description" content="EkoStudy is the premier online platform tailored for LASUSTECH students. Offering a comprehensive collection of lecture notes, study materials, and interactive courses across various departments, EkoStudy is designed to enhance your learning experience. Stay updated with the latest lectures, master critical concepts, and prepare effectively for your Computer-Based Tests (CBTs). Join your peers on EkoStudy to elevate your academic journey and achieve your educational goals with ease and confidence." />

{/* <!-- Open Graph / Facebook --> */}
<meta property="og:type" content="website" />
<meta property="og:url" content="https://eko-study.vercel.app/" />
<meta property="og:title" content="EkoStudy: Your Gateway to Academic Excellence at LASUSTECH" />
<meta property="og:description" content="EkoStudy is the premier online platform tailored for LASUSTECH students. Offering a comprehensive collection of lecture notes, study materials, and interactive courses across various departments, EkoStudy is designed to enhance your learning experience. Stay updated with the latest lectures, master critical concepts, and prepare effectively for your Computer-Based Tests (CBTs). Join your peers on EkoStudy to elevate your academic journey and achieve your educational goals with ease and confidence." />
<meta property="og:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png" />

{/* <!-- Twitter --> */}
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://ek-ostudy.vercel.app/" />
<meta property="twitter:title" content="EkoStudy: Your Gateway to Academic Excellence at LASUSTECH" />
<meta property="twitter:description" content="EkoStudy is the premier online platform tailored for LASUSTECH students. Offering a comprehensive collection of lecture notes, study materials, and interactive courses across various departments, EkoStudy is designed to enhance your learning experience. Stay updated with the latest lectures, master critical concepts, and prepare effectively for your Computer-Based Tests (CBTs). Join your peers on EkoStudy to elevate your academic journey and achieve your educational goals with ease and confidence." />
<meta property="twitter:image" content="https://ik.imagekit.io/mshcgnjju/EkoStudy/ScreenShot%20Tool%20-20240805011237.png" />
      </Head>
      <body className={`${outfit.variable} ${merriweather.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
