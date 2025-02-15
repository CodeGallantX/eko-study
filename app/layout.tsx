import { Outfit, Merriweather } from "next/font/google";
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

export const metadata = {
  title: "Sign In - The Ultimate Academic Hub",
  description:
    "EkoStudy is the ultimate online resource for students of Lagos State University of Science and Technology (LASUSTECH), Ikorodu...",
  keywords:
    "LASUSTECH pre-degree, LASUSTECH departments, study resources, pre-degree exam resources, EkoStudy online courses...",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${merriweather.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
