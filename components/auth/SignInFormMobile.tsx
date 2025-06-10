'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PiGoogleLogoBold } from 'react-icons/pi';
import { FaArrowLeft } from "react-icons/fa6";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const SignInFormMobile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { email, password } = formData;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if email needs verification
      if (data.user?.email_confirmed_at === null) {
        // Send verification email if not confirmed
        const { error: verificationError } = await supabase.auth.resend({
          type: 'signup',
          email: data.user.email!,
        });

        if (verificationError) throw verificationError;

        toast({
          title: 'Verification Required',
          description: 'Please check your email for a verification link.',
          duration: 3000,
        });
        router.push('/auth/verify');
      } else {
        // Successful login
        toast({
          title: 'Login Successful',
          description: 'You are being redirected to your dashboard.',
          duration: 2000,
        });
        router.push('/dashboard');
      }

    } catch (error) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'Invalid email or password. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage;
        
        if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email before signing in.';
        }
      }

      toast({
        title: 'Sign In Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <button
        onClick={() => {router.push('/')}}
        className="ml-6 border border-black text-sm px-3 py-2 rounded-lg"
      > 
        <FaArrowLeft className="mr-2 text-base inline-block" />
        Back
      </button>
      <div className="p-6">
        {/* Header */}
        <div className="text-left mb-6">
          <h1 className="text-3xl font-bold text-deepGreen mb-2">Welcome back</h1>
          <p className="text-base text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-green hover:text-deepGreen font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="text-sm sm:text-base focus:ring-2 focus:ring-green focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs sm:text-sm text-green hover:text-deepGreen font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="focus:ring-2 focus:ring-green focus:border-transparent transition-all pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
          </div>

          <Button
            type="submit"
            className="w-full bg-green text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:bg-deepGreen"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                <span className="text-sm sm:text-base">Signing in...</span>
              </>
            ) : (
              <span className="text-sm sm:text-base">Sign in</span>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-xs sm:text-sm text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50 transition-colors py-2.5 sm:py-3"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          ) : (
            <PiGoogleLogoBold className="mr-2 text-red" size={18} />
          )}
          <span className="text-sm sm:text-base">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
};