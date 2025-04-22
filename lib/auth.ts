'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData, clearUserData } from '@/lib/redux/features/userSlice';
import { RootState } from '@/lib/redux/store';

interface UserData {
  username: string;
  token: string;
}

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, token, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(() => {
    dispatch(clearUserData());
    localStorage.removeItem('userData');
    router.push('/auth/signin');
  }, [dispatch, router]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
          const userData: UserData = JSON.parse(storedData);
          if (userData.username && userData.token) {
            // Verify token with backend
            await axios.get('https://ekustudy.onrender.com/auth/verify', {
              headers: { Authorization: `Bearer ${userData.token}` }
            });
            dispatch(setUserData(userData));
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
  }, [dispatch, handleSignOut]);

  const signIn = async (credentials: { username: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('https://ekustudy.onrender.com/auth/login', credentials);
      const { username, token } = response.data;
      
      const userData: UserData = { username, token };
      dispatch(setUserData(userData));
      localStorage.setItem('userData', JSON.stringify(userData));
      
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Failed to sign in');
      } else {
        setError('An unexpected error occurred');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user: { username, token, isAuthenticated },
    loading,
    error,
    signIn,
    signOut: handleSignOut
  };
}