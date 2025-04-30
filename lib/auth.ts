// hooks/useAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData, clearUserData } from '@/lib/redux/features/userSlice';
import { RootState } from '@/lib/redux/store';

interface UserData {
  _id: string;
  fullName: string;
  email: string;
  username: string;
}

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(() => {
    dispatch(clearUserData());
    localStorage.removeItem('userData');
    router.push('/auth/signin');
  }, [dispatch, router]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get('https://ekustudy.onrender.com/users/profile', {
        withCredentials: true
      });
      
      if (response.data) {
        dispatch(setUserData(response.data));
        localStorage.setItem('userData', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      handleSignOut();
    }
  }, [dispatch, handleSignOut]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          const userData: UserData = JSON.parse(storedData);
          if (userData._id) {
            // Verify session with backend
            await fetchUserProfile();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        handleSignOut();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch, handleSignOut, fetchUserProfile]);

  return {
    user,
    loading,
    error,
    fetchUserProfile,
    signOut: handleSignOut
  };
}