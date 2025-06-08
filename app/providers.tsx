'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from '@/lib/redux/store';
import { supabase } from '@/lib/supabase';
import { setUserData, clearUser } from '@/lib/redux/features/userSlice';

// Auth provider wrapper component
function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        dispatch(setUserData({
          id: user.id,
          email: user.email,
          fullName: user.user_metadata?.full_name || '',
          username: user.user_metadata?.username || '',
          isAuthenticated: true
        }));
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          dispatch(setUserData({
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.user_metadata?.full_name || '',
            username: session.user.user_metadata?.username || '',
            isAuthenticated: true
          }));
        } else {
          dispatch(clearUser());
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}