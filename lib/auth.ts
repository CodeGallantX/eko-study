'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setUserData, clearUserData } from '@/lib/redux/features/userSlice';
import axios from 'axios';

interface User {
  _id?: string;
  userId?: string;
  username: string;
  email: string;
  fullName?: string;
  token?: string;
}

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!user.username && !!user.token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('auth_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          
          // Verify token with backend
          try {
            const response = await axios.get('https://ekustudy.onrender.com/users/verify-token', {
              headers: {
                Authorization: `Bearer ${storedToken}`
              }
            });
            
            if (response.data.valid) {
              // Token is valid, update Redux state
              dispatch(setUserData({
                username: userData.username,
                token: storedToken
              }));
            } else {
              // Token is invalid, clear auth state
              handleSignOut();
            }
          } catch (error) {
            // Error verifying token, clear auth state
            handleSignOut();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('https://ekustudy.onrender.com/users/login', {
        email,
        password
      });
      
      if (response.data && response.data.token) {
        const userData = {
          username: response.data.username,
          email: response.data.email,
          fullName: response.data.fullName,
          token: response.data.token
        };
        
        // Store in Redux
        dispatch(setUserData({
          username: userData.username,
          token: userData.token
        }));
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('auth_token', userData.token);
        
        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Failed to sign in');
        return { 
          success: false, 
          error: error.response.data.message || 'Failed to sign in' 
        };
      } else {
        setError('An unexpected error occurred');
        return { success: false, error: 'An unexpected error occurred' };
      }
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    handleSignOut();
  };

  // Helper function to clear auth state
  const handleSignOut = () => {
    // Clear Redux state
    dispatch(clearUserData());
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    
    // Redirect to sign in page
    router.push('/auth/signin');
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signIn,
    signOut
  };
}