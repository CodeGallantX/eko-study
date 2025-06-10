'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@/lib/supabase';
import { setUserData, clearUser, updateFromSupabaseSession } from '@/lib/redux/features/userSlice';
import { RootState } from '@/lib/redux/store';

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = useCallback(async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(clearUser());
      router.push('/auth/signin');
      setLoading(false);
    }
  }, [dispatch, router]);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      return profile;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  }, []);

  const handleAuthStateChange = useCallback(async (event: string, session: any) => {
    if (session?.user) {
      try {
        const profile = await fetchUserProfile(session.user.id);
        dispatch(updateFromSupabaseSession({
          ...session,
          profile: profile || {}
        }));
      } catch (error) {
        console.error('Error updating user session:', error);
        setError('Failed to update session');
      }
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, fetchUserProfile]);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Check for existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          dispatch(updateFromSupabaseSession({
            ...session,
            profile: profile || {}
          }));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
        await handleSignOut();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch, fetchUserProfile, handleAuthStateChange, handleSignOut]);

  return {
    user,
    loading,
    error,
    signOut: handleSignOut,
    refreshSession: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await handleAuthStateChange('SIGNED_IN', session);
      }
    }
  };
}