'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate email
      if (!email.trim()) {
        toast({
          title: 'Email Required',
          description: 'Please enter your email address',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // Send request to API
      await axios.post('https://ekustudy.onrender.com/auth/forgot-password', {
        email: email.trim().toLowerCase(),
      });

      // Show success message
      setIsEmailSent(true);
      toast({
        title: 'Email Sent',
        description: 'Check your inbox for password reset instructions',
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'Failed to send reset email';
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-50 md:dark:bg-gray-900 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:max-w-md bg-white dark:bg-gray-800 md:rounded-xl md:shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-8">
          <div className="mb-6">
            <Link 
              href="/auth/signin" 
              className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green dark:hover:text-green transition-colors border border-gray-700 dark:border-gray-50 px-4 py-2 rounded"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </div>
          
          <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Forgot Password</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email address and we&apos;ll send you instructions to reset your password
            </p>
          </div>

          {isEmailSent ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6 bg-green-50 dark:bg-deepGreen/20 rounded-lg border border-green dark:border-yellow"
            >
              <h2 className="text-lg font-semibold text-green dark:text-yellow mb-2">
                Check Your Email
              </h2>
              <p className="text-sm text-green dark:text-yellow mb-4">
                We&apos;ve sent password reset instructions to <span className="font-medium">{email}</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
              <Button
                onClick={() => setIsEmailSent(false)}
                variant="outline"
                className="w-full border-green-200 dark:border-green-800 text-green dark:text-yellow hover:bg-green-100 dark:hover:bg-green-900/30"
              >
                Try Another Email
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-green focus:border-transparent transition-all"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-deepGreen text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-sm hover:bg-deepGreen/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Sending Instructions...</span>
                  </>
                ) : (
                  <span>Send Reset Instructions</span>
                )}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
} 