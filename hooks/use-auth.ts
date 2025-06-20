// hooks/use-auth.ts
'use client';

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUserData, setUserData } from '@/lib/redux/features/userSlice';
import { supabase } from '@/lib/supabase';

// Add this interface at the top of the file
interface UserData {
  id: string;
  email?: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      dispatch(clearUserData());
      setUser(null);
      router.push('/auth/signin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [dispatch, router]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;

      if (user) {
        setUser(user);
        const userData: UserData = {
          id: user.id,
          email: user.email || '',
          firstName: user.user_metadata?.first_name || user.user_metadata?.firstName || '',
          lastName: user.user_metadata?.last_name || user.user_metadata?.lastName || '',
          avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.avatarUrl || '',
        };
        dispatch(setUserData({
          isAuthenticated: true,
          ...userData
        }));
      } else {
        setUser(null);
        dispatch(clearUserData());
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      dispatch(clearUserData());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        fetchUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        dispatch(clearUserData());
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUser, dispatch]);

  return {
    user,
    loading,
    signOut: handleSignOut,
    fetchUser,
  };
}