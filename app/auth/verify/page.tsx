'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OTPInput } from '@/components/ui/otp-input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUserData } from '@/lib/redux/features/userSlice';

export default function VerifyPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!userId) {
      toast({
        title: 'Error',
        description: 'Invalid verification link. Please try signing up again.',
        variant: 'destructive',
      });
      router.push('/auth/signup');
      return;
    }

    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [userId, router]);

  const handleVerify = async () => {
    if (!userId || otp.length !== 6) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`https://ekustudy.onrender.com/auth/verify-login/${userId}`, {
        otp,
      });

      // Store token and user data in Redux
      if (response.data.token) {
        // Extract first name from the response or use a default
        const firstName = response.data.firstName || 'User';
        
        dispatch(setUserData({
          firstName,
          token: response.data.token
        }));
        
        // Also store token in localStorage for persistence
        localStorage.setItem('auth_token', response.data.token);
      }

      toast({
        title: 'Verification successful!',
        description: 'Your account has been verified. Redirecting to dashboard...',
        duration: 3000,
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: 'Verification failed',
        description: 'Invalid OTP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsSubmitting(true);
    
    try {
      // Assuming there's an endpoint to resend OTP
      await axios.post(`https://ekustudy.onrender.com/auth/resend-otp/${userId}`);
      
      toast({
        title: 'OTP resent',
        description: 'A new OTP has been sent to your email.',
      });
      
      // Reset timer and disable resend button
      setTimer(60);
      setCanResend(false);
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast({
        title: 'Failed to resend OTP',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-deepGreen mb-2">Verify your email</h1>
          <p className="text-sm sm:text-base text-gray-600">
            We've sent a verification code to your email address.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <OTPInput
              value={otp}
              onChange={setOtp}
              maxLength={6}
              className="justify-center"
            />
          </div>

          <Button
            onClick={handleVerify}
            className="w-full bg-green text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:bg-deepGreen"
            disabled={isSubmitting || otp.length !== 6}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                <span className="text-sm sm:text-base">Verifying...</span>
              </>
            ) : (
              <span className="text-sm sm:text-base">Verify</span>
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive a code?{' '}
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  className="text-green hover:text-deepGreen font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Resend
                </button>
              ) : (
                <span className="text-gray-500">
                  Resend in <span className="font-medium">{timer}s</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 