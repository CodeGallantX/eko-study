'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/lib/supabase';
import { setUserData, clearUserData } from '@/lib/redux/features/userSlice';
import { RootState } from '@/lib/redux/store';

interface UserData {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
    full_name?: string;
  };
}

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout failed:', error);
      // Continue with clearing data even if logout fails
    }
    dispatch(clearUserData());
    localStorage.removeItem('userData');
    router.push('/auth/signin');
  }, [dispatch, router]);

  const fetchUserProfile = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      if (!user) throw new Error('No user found');

      // Get additional user data from profiles table if needed
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      const userData = {
        id: user.id,
        email: user.email,
        ...profile // merge any additional profile data
      };

      dispatch(setUserData(userData));
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(userData));
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

        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        const storedData = localStorage.getItem('userData');
        if (storedData) {
          const userData: UserData = JSON.parse(storedData);
          if (userData?.id) {
            if (session) {
              // If we have a session, refresh user data
              await fetchUserProfile();
            } else {
              // No active session but stored data - clear it
              localStorage.removeItem('userData');
              dispatch(clearUserData());
            }
          }
        } else if (session) {
          // No stored data but we have a session - fetch user
          await fetchUserProfile();
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

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          await fetchUserProfile();
        } else {
          dispatch(clearUserData());
          localStorage.removeItem('userData');
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [fetchUserProfile, handleSignOut, dispatch]);

  return {
    user,
    loading,
    error,
    fetchUserProfile,
    signOut: handleSignOut,
  };
}