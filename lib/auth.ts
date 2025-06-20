// lib/auth.ts
'use client';

import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

interface SignUpParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  college: string;
  department: string;
}

interface UserMetadata {
  first_name?: string;
  last_name?: string;
  college?: string;
  department?: string;
  avatar_url?: string;
}

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
  college,
  department
}: SignUpParams): Promise<User> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        college,
        department
      } as UserMetadata
    }
  });

  if (error) {
    console.error('Sign up error:', error);
    throw new Error(error.message || 'Failed to sign up');
  }

  if (!data.user) {
    throw new Error('No user returned after sign up');
  }

  return data.user;
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Failed to sign in');
  }

  return data.user;
};

export const signInWithGoogle = async (): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });

  if (error) {
    console.error('Google sign in error:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Get user error:', error);
    throw new Error(error.message || 'Failed to get current user');
  }

  return user;
};

export const getUserMetadata = async (): Promise<UserMetadata | null> => {
  const user = await getCurrentUser();
  return user?.user_metadata as UserMetadata ?? null;
};

export const updateUserProfile = async (
  updates: Partial<UserMetadata>
): Promise<void> => {
  const { error } = await supabase.auth.updateUser({
    data: updates
  });

  if (error) {
    console.error('Update profile error:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/update-password`
  });

  if (error) {
    console.error('Password reset error:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
};

export const verifyOtp = async (
  email: string,
  token: string,
  type: 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change'
): Promise<void> => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type
  });

  if (error) {
    console.error('OTP verification error:', error);
    throw new Error(error.message || 'Failed to verify OTP');
  }
};