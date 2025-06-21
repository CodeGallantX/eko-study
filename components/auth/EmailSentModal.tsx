'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface EmailSentModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  type: 'verification' | 'reset';
}

export function EmailSentModal({ isOpen, onClose, email, type }: EmailSentModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
                {type === 'verification' ? 'Verification Email Sent' : 'Password Reset Link Sent'}
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {type === 'verification'
                  ? 'We\'ve sent a verification code to your email address. Please check your inbox and enter the code to verify your account.'
                  : 'We\'ve sent a password reset link to your email address. Please check your inbox to reset your password.'}
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-6">{email}</p>
              
              <Button
                onClick={onClose}
                className="w-full bg-deepGreen hover:bg-deepGreen/90"
              >
                Got it!
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}