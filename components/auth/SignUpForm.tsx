'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PiGoogleLogoBold } from 'react-icons/pi';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUserData } from '@/lib/redux/features/userSlice';

interface FormData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  agreeTerms: boolean;
}

export const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    username: '',
    password: '',
    agreeTerms: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validateForm = useCallback(() => {
    if (!formData.fullName.trim()) {
      throw new Error('Full name is required');
    }
    if (!formData.email.trim()) {
      throw new Error('Email is required');
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }
    if (!formData.username.trim()) {
      throw new Error('Username is required');
    }
    if (formData.username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }
    if (!formData.password) {
      throw new Error('Password is required');
    }
    if (formData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    if (!/^[A-Za-z0-9]+$/.test(formData.password)) {
      throw new Error('Password can only contain letters and numbers');
    }
    if (!formData.agreeTerms) {
      throw new Error('You must agree to the terms and conditions');
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      validateForm();

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        username: formData.username.trim().toLowerCase(),
        password: formData.password,
      };

      const response = await axios.post(
        'https://ekustudy.onrender.com/users/createUser',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (!response.data?.userId && !response.data?._id) {
        throw new Error('User ID not found in response');
      }

      const userId = response.data.userId || response.data._id;
      dispatch(setUserData({ 
        username: formData.username.trim().toLowerCase(), 
        token: response.data.token || '' 
      }));
      
      toast({
        title: 'Account created successfully!',
        description: 'Please verify your email to continue.',
        duration: 3000,
      });
      
      router.push(`/auth/verify?userId=${userId}`);
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      
      if (error instanceof Error && !axios.isAxiosError(error)) {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }
      
      if (axios.isAxiosError(error)) {
        let errorMessage = 'Failed to create account. Please try again.';
        
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = error.response.data?.message || 
              'Invalid information provided. Please check your details.';
            
            if (error.response.data?.errors) {
              const errors = error.response.data.errors;
              if (errors.email) errorMessage = errors.email;
              if (errors.username) errorMessage = errors.username;
              if (errors.password) errorMessage = errors.password;
            }
          } else if (error.response.status === 409) {
            const responseData = error.response.data;
            
            if (responseData.message === 'User already exists') {
              toast({
                title: 'Account Already Exists',
                description: (
                  <div className="flex flex-col gap-2">
                    <p>An account with these details already exists.</p>
                    <Button 
                      onClick={() => router.push('/auth/signin')}
                      className="w-full mt-2 text-black"
                      variant="outline"
                    >
                      Sign In Instead
                    </Button>
                  </div>
                ),
                variant: 'destructive',
              });
              return;
            } else if (responseData.message?.toLowerCase().includes('email')) {
              errorMessage = 'This email is already registered.';
            } else if (responseData.message?.toLowerCase().includes('username')) {
              errorMessage = 'This username is already taken.';
            }
          }
        }
        
        toast({
          title: 'Sign Up Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Sign Up Failed',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const passwordRegex = /^[A-Za-z0-9]+$/;
    
    if (!value) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else if (!passwordRegex.test(value)) {
      setPasswordError('Password can only contain letters and numbers');
    } else {
      setPasswordError('');
    }
    
    setFormData(prev => ({ ...prev, password: value }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(prev => !prev);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6 sm:p-8 md:p-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-center mb-8"
        >
          <motion.h1 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-3xl sm:text-4xl font-bold text-deepGreen dark:text-emerald-400 mb-3"
          >
            Join EkoStudy
          </motion.h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-green dark:text-emerald-400 hover:text-deepGreen dark:hover:text-emerald-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">Full name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-green focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-green focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              className="focus:ring-2 focus:ring-green focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Must be at least 3 characters
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-2"
          >
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                minLength={6}
                className={`focus:ring-2 focus:ring-green focus:border-transparent dark:bg-gray-800 dark:border-gray-700 pr-10 ${
                  passwordError ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{passwordError}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Must be at least 6 characters and contain only letters and numbers
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-start space-x-3 pt-1"
          >
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
              }
              className="mt-0.5 border-gray-300 dark:border-gray-600 data-[state=checked]:bg-green data-[state=checked]:border-green dark:data-[state=checked]:bg-emerald-400 dark:data-[state=checked]:border-emerald-400"
            />
            <label
              htmlFor="agreeTerms"
              className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug"
            >
              I agree to the{' '}
              <Link
                href="/terms"
                className="text-green dark:text-emerald-400 hover:text-deepGreen dark:hover:text-emerald-300 font-medium transition-colors"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="text-green dark:text-emerald-400 hover:text-deepGreen dark:hover:text-emerald-300 font-medium transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="pt-2"
          >
            <Button
              type="submit"
              className="w-full bg-green hover:bg-deepGreen dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-sm"
              disabled={isSubmitting || !formData.agreeTerms || !!passwordError}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span className="text-sm sm:text-base">Creating account...</span>
                </>
              ) : (
                <span className="text-sm sm:text-base">Create account</span>
              )}
            </Button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors py-3"
            type="button"
            size="lg"
          >
            <PiGoogleLogoBold className="mr-2 text-red-500 dark:text-red-400" size={18} />
            <span className="text-sm sm:text-base">Continue with Google</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};