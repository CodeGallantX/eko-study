'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';

interface OTPVerificationFormProps {
  email: string;
  onResendOTP: () => void;
}

export function OTPVerificationForm({ email, onResendOTP }: OTPVerificationFormProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://ekustudy.onrender.com/users/verify-email', {
        email,
        otp: otpString,
      });

      if (response.data.success) {
        toast({
          title: 'Email Verified',
          description: 'Your email has been successfully verified. You can now log in.',
        });

        // Store user data in Redux and localStorage
        const userData = {
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          username: response.data.user.username,
          isAuthenticated: true,
        };
        dispatch(setUser(userData));
        localStorage.setItem('user', JSON.stringify(userData));

        router.push('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.response?.data?.message || 'Failed to verify email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Your Email</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border border-gray-300 text-center text-lg font-semibold focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.join('').length !== 6}
          className="w-full rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onResendOTP}
            disabled={timer > 0}
            className="text-sm text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 