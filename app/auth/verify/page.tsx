'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Preloader from "@/components/shared/Preloader";
import { useRouter, useSearchParams } from 'next/navigation';
import { OTPInput } from '@/components/ui/otp-input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAppDispatch } from '@/lib/redux/hooks';
import { setUserData } from '@/lib/redux/features/userSlice';

interface ApiUserResponse {
  _id: string;
  fullName: string;
  email: string;
  username: string;
}

function VerifyContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!userId && mounted) {
      toast({
        title: 'Error',
        description: 'Invalid verification link. Please try signing in again.',
        variant: 'destructive',
      });
      router.push('/auth/signin');
    }
  }, [userId, router, mounted]);

  useEffect(() => {
    if (!mounted) return;
    
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
  }, [canResend, mounted]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get<ApiUserResponse>('https://ekustudy.onrender.com/users/profile', {
        withCredentials: true
      });
      
      if (response.data) {
        const userData = {
          isAuthenticated: true,
          _id: response.data._id,
          fullName: response.data.fullName,
          email: response.data.email,
          username: response.data.username
        };
        
        dispatch(setUserData(userData));
        localStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      toast({
        title: 'Profile load failed',
        description: 'Your account is verified but we couldn\'t load your profile. You may need to sign in again.',
        variant: 'default',
      });
      router.push('/dashboard');
    }
  };

  const handleVerify = async () => {
    if (!userId || otp.length !== 6 || !mounted) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `https://ekustudy.onrender.com/auth/verify-login/${userId}`,
        { otp },
        { withCredentials: true }
      );

      if (response.status === 200) {
        await fetchUserProfile();

        toast({
          title: 'Verification successful!',
          description: 'Your account has been verified. Redirecting to dashboard...',
          duration: 3000,
        });

        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Verification error:', error);
      
      let errorMessage = 'Invalid OTP. Please try again.';
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = 'Session expired. Please sign in again.';
          router.push('/auth/signin');
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      toast({
        title: 'Verification failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || !userId || !mounted) return;
    
    setIsSubmitting(true);
    
    try {
      await axios.post('https://ekustudy.onrender.com/auth/resend-otp', { userId });
      
      toast({
        title: 'OTP Resent',
        description: 'A new verification code has been sent to your email.',
      });
      
      setTimer(180);
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

  if (!mounted) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"></div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-deepGreen mb-2">Verify your email</h1>
          <p className="text-sm sm:text-base text-gray-600">
            We&apos;ve sent a 6-digit code to your email address.
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
              Didn&apos;t receive a code?{' '}
              {canResend ? (
                <button
                  onClick={handleResendOTP}
                  className="text-green hover:text-deepGreen font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">
                  Resend in <span className="font-medium">{formatTime(timer)}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <VerifyContent />
    </Suspense>
  );
}