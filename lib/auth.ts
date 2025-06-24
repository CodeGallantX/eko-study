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
  avatar_url?: string;
}

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
  college,
  department
}: SignUpParams): Promise<{ user: User | null; error: Error | null }> => {
  try {
    // Step 1: Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        } as UserMetadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      console.error('Auth sign up error:', authError);
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No user returned after sign up');
    }

    // Step 2: Create profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        college,
        department,
        updated_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw profileError;
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Complete sign up error:', error);
    return { 
      user: null, 
      error: error instanceof Error ? error : new Error('Unknown error occurred') 
    };
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
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
        prompt: 'consent',
      },
    },
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

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Get profile error:', error);
    throw new Error(error.message || 'Failed to get user profile');
  }

  return data;
};

export const updateUserProfile = async (
  userId: string,
  updates: {
    first_name?: string;
    last_name?: string;
    college?: string;
    department?: string;
    avatar_url?: string;
  }
) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Update profile error:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/update-password`,
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
    type,
  });

  if (error) {
    console.error('OTP verification error:', error);
    throw new Error(error.message || 'Failed to verify OTP');
  }
};