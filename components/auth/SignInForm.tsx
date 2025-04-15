'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { PiGoogleLogoBold } from 'react-icons/pi';
import { motion } from 'framer-motion';

export const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://ekustudy.onrender.com/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          // Adding default values for required fields
          fullName: email.split('@')[0], // Using email username as fullName
          username: email.split('@')[0], // Using email username as username
        }),
      });

      if (!response.ok) {
        throw new Error('Sign in failed');
      }

      const data = await response.json();
      
      // Store token if available
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      toast({
        title: 'Successfully signed in!',
        description: 'Redirecting to your dashboard...',
        duration: 3000,
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (): void => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="p-5 sm:p-6 md:p-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-deepGreen mb-2">Welcome back</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-green hover:text-deepGreen font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              required
              className="focus:ring-2 focus:ring-green focus:border-transparent transition-all"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs sm:text-sm font-medium text-green hover:text-deepGreen transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                required
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
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="pt-2"
          >
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
                <span className="text-sm sm:text-base">Sign In</span>
              )}
            </Button>
          </motion.div>
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

        {/* Terms */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs sm:text-sm text-gray-500 mb-4"
        >
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="text-green hover:text-deepGreen font-medium transition-colors"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="text-green hover:text-deepGreen font-medium transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </motion.p>

        {/* Google Button - Moved to bottom */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 transition-colors py-2.5 sm:py-3"
            type="button"
          >
            <PiGoogleLogoBold className="mr-2 text-red" size={18} />
            <span className="text-sm sm:text-base">Continue with Google</span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};