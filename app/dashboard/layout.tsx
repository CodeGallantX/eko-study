'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { clearUserData, setUserData, setAuthToken } from '@/lib/redux/features/userSlice';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import axios from 'axios';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, isAuthenticated, token } = useSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

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

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authentication status
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('auth_token');
        
        if (userData && !isAuthenticated) {
          const parsedUserData = JSON.parse(userData);
          dispatch(setUserData({
            _id: parsedUserData._id || '',
            fullName: parsedUserData.fullName || '',
            email: parsedUserData.email || '',
            username: parsedUserData.username || ''
          }));
          dispatch(setAuthToken(token || ''));
        }
        
        if (!token || !userData) {
          router.push('/auth/signin');
          return;
        }
        
        try {
          await axios.get('https://ekustudy.onrender.com/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          setIsLoading(false);
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          dispatch(clearUserData());
          localStorage.removeItem('user');
          localStorage.removeItem('auth_token');
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoading(false);
      } finally {
        setAuthChecked(true);
      }
    };
    
    if (mounted) {
      checkAuth();
    }
  }, [isAuthenticated, router, dispatch, mounted]);

  const handleSignOut = async () => {
    try {
      await fetch("https://ekustudy.onrender.com/auth/logout", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        redirect: 'follow'
      });
      
      dispatch(clearUserData());
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error during logout:', error);
      dispatch(clearUserData());
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      router.push('/auth/signin');
    }
  };

  if (!mounted || isLoading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deepGreen"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <>
        <Sidebar
          isDarkMode={isDarkMode}
          isSidebarCollapsed={isSidebarCollapsed}
          activeSection={activeSection}
          username={username || 'User'}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          setActiveSection={setActiveSection}
          onSignOut={handleSignOut}
        />
        
        <TopNav
          isDarkMode={isDarkMode}
          isSidebarCollapsed={isSidebarCollapsed}
          username={username || 'User'}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          notifications={notifications}
        />

        <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
          {children}
        </main>
      </>
    </div>
  );
}