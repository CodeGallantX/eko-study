'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
// import { clearUserData, setUserData } from '@/lib/redux/features/userSlice';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
// import axios from 'axios';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  // const [isLoading, setIsLoading] = useState(true);
  // const [userProfile, setUserProfile] = useState<any>(null);
  // const [mounted, setMounted] = useState(false);
  // const [authChecked, setAuthChecked] = useState(false);

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

  // // Set mounted state after component mounts
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // // Check authentication status
  // useEffect(() => {
  //   // Only run on client side
  //   if (typeof window === 'undefined') return;
    
  //   const checkAuth = async () => {
  //     try {
  //       const userData = localStorage.getItem('user');
  //       const token = localStorage.getItem('auth_token');
        
  //       // If we have user data in localStorage but not in Redux, update Redux
  //       if (userData && !isAuthenticated) {
  //         const parsedUserData = JSON.parse(userData);
  //         dispatch(setUserData({
  //           username: parsedUserData.username || '',
  //           token: token || ''
  //         }));
  //       }
        
  //       // If no token or user data, redirect to sign in
  //       if (!token || !userData) {
  //         router.push('/auth/signin');
  //         return;
  //       }
        
  //       // Fetch user profile data
  //       try {
  //         const response = await axios.get('https://ekustudy.onrender.com/users/profile', {
  //           headers: {
  //             'Authorization': `Bearer ${token}`
  //           }
  //         });
          
  //         setUserProfile(response.data);
  //         setIsLoading(false);
  //       } catch (profileError) {
  //         console.error('Error fetching profile:', profileError);
  //         // If profile fetch fails, clear auth and redirect
  //         dispatch(clearUserData());
  //         localStorage.removeItem('user');
  //         localStorage.removeItem('auth_token');
  //         router.push('/auth/signin');
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //       setIsLoading(false);
  //     } finally {
  //       setAuthChecked(true);
  //     }
  //   };
    
  //   if (mounted) {
  //     checkAuth();
  //   }
  // }, [isAuthenticated, router, dispatch, mounted]);

  // const handleSignOut = async () => {
  //   try {
  //     // Call the logout API endpoint
  //     await fetch("https://ekustudy.onrender.com/auth/logout", {
  //       method: 'GET',
  //       redirect: 'follow'
  //     });
      
  //     // Clear local state and storage
  //     dispatch(clearUserData());
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('auth_token');
  //     router.push('/auth/signin');
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //     // Still clear local state even if API call fails
  //     dispatch(clearUserData());
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('auth_token');
  //     router.push('/auth/signin');
  //   }
  // };

  // // Show loading state during SSR or initial client render
  // if (!mounted || isLoading || !authChecked) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deepGreen"></div>
  //     </div>
  //   );
  // }

  // Only render the full layout after component is mounted and auth is checked
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* {mounted && ( */}
        <>
          <Sidebar
            isDarkMode={isDarkMode}
            isSidebarCollapsed={isSidebarCollapsed}
            activeSection={activeSection}
            username={username || 'User'}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            setActiveSection={setActiveSection}
            // handleSignOut={handleSignOut}
          />
          
          <TopNav
            isDarkMode={isDarkMode}
            isSidebarCollapsed={isSidebarCollapsed}
            username={username || 'User'}
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            // notifications={notifications}
          />

          <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
            {children}
          </main>
        </>
      {/* )} */}
    </div>
  );
}
