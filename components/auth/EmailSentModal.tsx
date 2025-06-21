'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EmailSentModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  type: 'verification' | 'reset' | 'reset-success';
  customMessage?: {
    title: string;
    description: string;
  };
  redirectUrl?: string;
  redirectDelay?: number;
}

export function EmailSentModal({ 
  isOpen, 
  onClose, 
  email, 
  type, 
  customMessage,
  redirectUrl,
  redirectDelay = 3000
}: EmailSentModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && redirectUrl) {
      const timer = setTimeout(() => {
        setIsRedirecting(true);
        router.push(redirectUrl);
      }, redirectDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, redirectUrl, redirectDelay, router]);

  if (!mounted) {
    return null;
  }

  const defaultMessages = {
    verification: {
      title: 'Verification Email Sent',
      description: 'We\'ve sent a verification code to your email address. Please check your inbox and enter the code to verify your account.'
    },
    reset: {
      title: 'Password Reset Link Sent',
      description: 'We\'ve sent a password reset link to your email address. Please check your inbox to reset your password.'
    },
    'reset-success': {
      title: 'Password Reset Successful',
      description: 'Your password has been updated successfully. You can now sign in with your new password.'
    }
  };

  const { title, description } = customMessage || defaultMessages[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 mx-4"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              disabled={isRedirecting}
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30"
              >
                <CheckCircle2 className="h-8 w-8 text-green-500 dark:text-green-400" />
              </motion.div>

              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {description}
              </p>
              
              {email && (
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-6">
                  {email}
                </p>
              )}

              {isRedirecting ? (
                <div className="flex items-center justify-center w-full py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Redirecting...
                  </span>
                </div>
              ) : (
                <Button
                  onClick={onClose}
                  className="w-full bg-deepGreen hover:bg-deepGreen/90"
                >
                  {type === 'reset-success' ? 'Go to Sign In' : 'Got it!'}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}