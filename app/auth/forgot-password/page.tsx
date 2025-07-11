'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { EmailSentModal } from '@/components/auth/EmailSentModal';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      // Show success modal
      setIsModalOpen(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      
      let errorMessage = 'Failed to send reset email';
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          errorMessage = 'No account found with this email address';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Please wait before requesting another reset email';
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
        </div>
      </motion.div>

      <EmailSentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
        type="reset"
      />
    </div>
  );
}