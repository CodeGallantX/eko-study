// lib/auth.ts
'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser, setUserData } from '@/lib/redux/features/userSlice';

export function useAuth() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded && user) {
      dispatch(setUserData({
        isAuthenticated: true,
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.emailAddresses[0]?.emailAddress || '',
        avatarUrl: user.imageUrl,
      }));
    }
  }, [user, isLoaded, dispatch]);

  const handleSignOut = async () => {
    await signOut();
    dispatch(clearUser());
    router.push('/auth/signin');
  };

  return {
    user: {
      isAuthenticated: !!user,
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses[0]?.emailAddress,
      avatarUrl: user?.imageUrl,
    },
    loading: !isLoaded,
    signOut: handleSignOut,
  };
}