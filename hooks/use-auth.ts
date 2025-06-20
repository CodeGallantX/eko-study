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
    signOut: handleSignOut,
  };
}