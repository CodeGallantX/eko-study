'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useClerk } from '@clerk/nextjs';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useClerk();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const token = searchParams.get('token');

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword(newPassword)) return;
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        description: 'Please make sure your passwords match',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      if (!token) {
        throw new Error('Reset token is missing');
      }

      // Attempt to reset password with Clerk
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        password: newPassword,
        code: token,
      });

      if (result.status === 'complete') {
        setIsSuccess(true);
        toast({
          title: 'Password Reset Successful',
          description: 'Your password has been reset successfully',
        });
        
        setTimeout(() => router.push('/auth/signin'), 3000);
      } else {
        throw new Error('Password reset failed');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      let errorMessage = 'Failed to reset password';
      
      if (error instanceof Error) {
        if (error.message.includes('expired')) {
          errorMessage = 'This password reset link has expired. Please request a new one.';
        } else if (error.message.includes('invalid')) {
          errorMessage = 'This password reset link is invalid. Please request a new one.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/auth/forgot-password">
            <Button className="bg-primary text-white">
              Request New Reset Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="mb-6">
            <Link 
              href="/auth/signin" 
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your new password below
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                Password Reset Successful
              </h2>
              <p className="text-sm text-green-700 dark:text-green-400 mb-4">
                Redirecting to sign in page...
              </p>
              <Loader2 className="h-5 w-5 animate-spin text-green-600 dark:text-green-400 mx-auto" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      validatePassword(e.target.value);
                      setNewPassword(e.target.value);
                    }}
                    required
                    minLength={8}
                    className={`pr-10 ${passwordError ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    aria-label={confirmPasswordVisible ? 'Hide password' : 'Show password'}
                  >
                    {confirmPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}