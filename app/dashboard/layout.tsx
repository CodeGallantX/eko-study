"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { getCurrentUser } from '@/lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();

  // Check user session
  const checkSession = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/auth/signin');
      }
    } catch (error) {
      router.push('/auth/signin');
    }
  };

  // Mock notifications data
  const notifications = [
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

      <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
        {children}
      </main>
    </div>
  );
}