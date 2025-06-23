'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setUserData, clearUserData } from '@/lib/redux/features/userSlice';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { useUser } from '@supabase/auth-helpers-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const user = useUser();

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user && !isAuthenticated) {
          router.push('/auth/signin');
          return;
        }

        if (user && !isAuthenticated) {
          const { data: userProfile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) console.error('Error fetching user profile:', error);

          dispatch(setUserData({
            id: user.id,
            email: user.email || '',
            firstName: user.user_metadata?.first_name || user.user_metadata?.name?.split(' ')[0] || user.email?.split('@')[0] || '',
            lastName: user.user_metadata?.last_name || user.user_metadata?.name?.split(' ')[1] || '',
            profile: {
              avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || userProfile?.avatar_url || '',
              college: userProfile?.college || '',
              department: userProfile?.department || ''
            }
          }));
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoading(false);
        router.push('/auth/signin');
      }
    };

    checkAuth();
  }, [user, isAuthenticated, router, dispatch, supabase]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      dispatch(clearUserData());
      router.push('/auth/signin');
    } else {
      console.error('Sign out error:', error);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deepGreen"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        activeSection={activeSection}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        setActiveSection={setActiveSection}
        onSignOut={handleSignOut}
      />

      <TopNav
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        notifications={notifications}
        toggleDarkMode={toggleDarkMode}
      />

      <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Profile
          </h1>

          <div className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
            <p className="mb-2"><strong>First Name:</strong> {user?.user_metadata?.first_name}</p>
            <p className="mb-2"><strong>Last Name:</strong> {user?.user_metadata?.last_name}</p>
            <p className="mb-2"><strong>College:</strong> {user?.user_metadata?.college}</p>
            <p className="mb-2"><strong>Department:</strong> {user?.user_metadata?.department}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
