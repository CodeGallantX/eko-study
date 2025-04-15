'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearUserData } from '@/lib/redux/features/userSlice';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { firstName, isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  const handleSignOut = () => {
    // Clear user data from Redux
    dispatch(clearUserData());
    
    // Clear token from localStorage
    localStorage.removeItem('auth_token');
    
    // Redirect to sign in page
    router.push('/auth/signin');
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-deepGreen">
              Welcome, {firstName}!
            </h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              This is your dashboard. You can add more content here.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Profile</h2>
              <p className="text-gray-600">
                First Name: <span className="font-medium">{firstName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 