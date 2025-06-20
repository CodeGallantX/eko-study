'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function App() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const { firstName } = useSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading, signOut } = useAuth();

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authentication status
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('auth_token');
        
        if (!token || !userData) {
          router.push('/dashboard');
          // router.push('/auth/signin');
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoading(false);
      }
    };
    
    if (mounted) {
      checkAuth();
    }
  }, [router, mounted]);

  const handleSignOut = () => {
    signOut();
  };

  // Show loading state during SSR or initial client render
  if (!mounted || isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Only render the dashboard content after component is mounted and auth is checked
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, 
          {user?.firstName || firstName || 'Student'}
          Student
          !</h1>
        <button 
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white text-black dark:bg-gray-700 dark:text-white p-6 rounded-lg shadow-md">
          
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <p className="text-gray-600">View and edit your profile information</p>
        </div>
        
        <div className="bg-white text-black dark:bg-gray-700 dark:text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
          <p className="text-gray-600">Continue learning from where you left off</p>
        </div>
        
        <div className="bg-white text-black dark:bg-gray-700 dark:text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Study Groups</h2>
          <p className="text-gray-600">Join study groups and collaborate with peers</p>
        </div>
      </div>
    </div>
  );
} 