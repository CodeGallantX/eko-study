'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getUser, signOutUser } from '@/lib/auth';
import { clearUser, setUserData } from '@/lib/redux/features/userSlice';

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = useCallback(async () => {
    await signOutUser();
    dispatch(clearUser());
    router.push('/auth/signin');
  }, [dispatch, router]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        dispatch(setUserData({
          isAuthenticated: true,
          id: user.id,
          firstName: user.user_metadata?.firstName || '',
          lastName: user.user_metadata?.lastName || '',
          email: user.email || '',
          avatarUrl: user.user_metadata?.avatarUrl || '',
        }));
      } else {
        dispatch(clearUser());
      }
    };

    fetchUser();
  }, [dispatch]);

  return {
    user: null, // You might want to get the user from the Redux store instead
    loading: false, // This hook doesn't manage loading state from async operations
    signOut: handleSignOut,
    // Add other auth related functions if needed, e.g., signIn, signUp
  };
}

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