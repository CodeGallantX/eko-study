// app/dashboard/layout.tsx
"use client";
import { useState, useEffect } from "react";
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, isLoaded } = useAuth();

  // Redirect if user is not logged in and auth is loaded
  if (isLoaded && !userId) {
    redirect('/auth/signin');
  }

  const [activeSection, setActiveSection] = useState('dashboard');

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

  // State for sidebar and dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        activeSection={activeSection}
        username={userId} // Using userId as username for now
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        setActiveSection={setActiveSection}
        onSignOut={() => {
          // This will be handled by Clerk's signOut in the components
        }}
      />
      
      <TopNav
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        username={userId} // Using userId as username for now
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        notifications={notifications}
      />

      <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
        {children}
      </main>
    </div>
  );
}