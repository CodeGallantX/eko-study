// hooks/use-auth.ts
'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUser, setUserData } from '@/lib/redux/features/userSlice';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(clearUser());
      router.push('/auth/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [dispatch, router]);

  const fetchUser = useCallback(async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;

      if (user) {
        dispatch(setUserData({
          isAuthenticated: true,
          id: user.id,
          firstName: user.user_metadata?.first_name || user.user_metadata?.firstName || '',
          lastName: user.user_metadata?.last_name || user.user_metadata?.lastName || '',
          email: user.email || '',
          avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.avatarUrl || '',
        }));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      dispatch(clearUser());
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        fetchUser();
      } else if (event === 'SIGNED_OUT') {
        dispatch(clearUser());
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUser]);

  return {
    signOut: handleSignOut,
    fetchUser,
  };
}