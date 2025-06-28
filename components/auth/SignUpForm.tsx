'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FaGoogle } from 'react-icons/fa';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  agreeTerms: boolean;
}

export const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validateForm = useCallback(() => {
    if (!formData.firstName.trim()) throw new Error('First name is required');
    if (!formData.lastName.trim()) throw new Error('Last name is required');
    if (!formData.email.trim()) throw new Error('Email is required');
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) throw new Error('Please enter a valid email address');
    if (!formData.phone.trim()) throw new Error('Phone number is required');
    if (!formData.password) throw new Error('Password is required');
    if (formData.password.length < 6) throw new Error('Password must be at least 6 characters long');
    if (!formData.agreeTerms) throw new Error('You must agree to the terms and conditions');
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      validateForm();

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
          // Redirect users to login page after email confirmation
          emailRedirectTo: `${window.location.origin}/auth/signin`
        }
      });

      if (error) throw error;

      toast({
        title: 'Account created successfully!',
        description: 'Please check your email to confirm your account. You can now sign in.',
        duration: 5000,
      });

      // Redirect to login page immediately after signup
      router.push('/auth/signin');
    } catch (error: unknown) {
      console.error('Sign up error:', error);

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;

        if (error.message.includes('User already registered')) {
          toast({
            title: 'Account Exists',
            description: (
              <div className="flex flex-col gap-2">
                <p>An account with this email already exists.</p>
                <Button
                  onClick={() => router.push('/auth/signin')}
                  className="w-full mt-2"
                  variant="outline"
                >
                  Sign In Instead
                </Button>
              </div>
            ),
            variant: 'destructive',
          });
          return;
        }
      }

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;

      toast({
        title: 'Redirecting...',
        description: 'You are being redirected to Google for authentication.',
      });
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: 'Google Sign In Failed',
        description: 'There was an error signing in with Google. Please try again.',
        variant: 'destructive',
      });
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
    if (!value) setPasswordError('Password is required');
    else if (value.length < 6) setPasswordError('Password must be at least 6 characters long');
    else setPasswordError('');
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
      className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="p-6 sm:p-8 md:p-10 lg:p-16">
        <motion.div className="text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-deepGreen dark:text-green mb-3">
            Join Us
          </h1>
          <p className="text-sm sm:text-green text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-green hover:text-deepGreen font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className='text-green font-normal' htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                className='py-5 rounded-lg text-green'
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label className='text-green font-normal' htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                className='py-5 rounded-lg text-green'
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className='text-green font-normal' htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@mail.com"
              className='py-5 rounded-lg text-green'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className='text-green font-normal' htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1234567890"
              className='py-5 rounded-lg text-green'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className='text-green font-normal' htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="••••••••••"
                className='py-5 rounded-lg text-green'
                value={formData.password}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {passwordError && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{passwordError}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Must be at least 6 characters
            </p>
          </div>

          <div className="flex items-start space-x-3 pt-1">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
              }
            />
            <label htmlFor="agreeTerms" className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-snug">
              I agree to the <Link href="/terms" className="text-green dark:text-green hover:text-deepGreen">Terms</Link> and <Link href="/privacy" className="text-green hover:text-deepGreen">Privacy Policy</Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.agreeTerms || !!passwordError}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white dark:bg-gray-900 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          size="lg"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 text-gray-500" size={18} />
          )}
          Continue with Google
        </Button>
      </div>
    </motion.div>
  );
};