'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData, clearUserData } from '@/lib/redux/features/userSlice';
import { RootState } from '@/lib/redux/store';

interface UserData {
  _id: string;
  email: string;
  username: string;
}

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(async () => {
    try {
      await axios.get('https://ekustudy.onrender.com/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
      // Continue with clearing data even if logout API fails
    }
    dispatch(clearUserData());
    localStorage.removeItem('userData');
    router.push('/auth/signin');
  }, [dispatch, router]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get('https://ekustudy.onrender.com/users/profile', {
        withCredentials: true,
      });

      if (response.data) {
        // Assuming the API response directly matches the structure needed by setUserData
        // which now expects fullName
        dispatch(setUserData({
          ...response.data,
          // If your API sends firstName and lastName, you might need to combine them here:
          // fullName: `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim(),
        }));
        if (typeof window !== 'undefined') {
          localStorage.setItem('userData', JSON.stringify(response.data));
        }
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError('Session expired or unauthorized');
      handleSignOut();
    }
  }, [dispatch, handleSignOut]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (typeof window === 'undefined') return;

        const storedData = localStorage.getItem('userData');
        if (storedData) {
          const userData: UserData = JSON.parse(storedData);
          if (userData?._id) {
            await fetchUserProfile();
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Auth initialization failed');
        handleSignOut();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile, handleSignOut]);

  return {
    user,
    loading,
    error,
    fetchUserProfile,
    signOut: handleSignOut,
  };
}
