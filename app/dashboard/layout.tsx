'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from 'next/head';
import Script from 'next/script';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import SupabaseProvider from '@/providers/SupabaseProvider'
import { useAuth } from '@/hooks/use-auth';
import Preloader from '@/components/shared/Preloader'

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { loading, isAuthenticated } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const { signOut } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [loading, isAuthenticated, router])

  if (loading || !isAuthenticated) {
    return <Preloader />
  }

  const notifications: Notification[] = [
    {
      id: 1,
      title: 'New Course Available',
      message: 'Introduction to Computer Science is now available',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Study Group Invitation',
      message: 'You have been invited to join the Physics study group',
      time: '1 day ago',
      read: true
    }
  ];

  return (
    <>
      <Head>
        <title>Dashboard - EkoStudy</title>
        <meta name="description" content="Your personalized learning dashboard with courses, study groups, and AI assistance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="EkoStudy - Student Dashboard" />
        <meta property="og:description" content="Your personalized learning dashboard with courses, study groups, and AI assistance" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EkoStudy - Student Dashboard" />
        <meta name="twitter:description" content="Your personalized learning dashboard with courses, study groups, and AI assistance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sidebar
          isDarkMode={isDarkMode}
          isSidebarCollapsed={isSidebarCollapsed}
          activeSection={activeSection}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          setActiveSection={setActiveSection}
          onSignOut={signOut}
        />
        
        <TopNav
          isDarkMode={isDarkMode}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          notifications={notifications}
        />
        <SupabaseProvider>
          <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
            {children}
          </main>
        </SupabaseProvider>
      </div>
    </>
  );
}