'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Preloader from "@/components/shared/Preloader";
import { useRouter, useSearchParams } from 'next/navigation';
import { OTPInput } from '@/components/ui/otp-input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUserData } from '@/lib/redux/features/userSlice';

function VerifyContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  // Get user data from Redux store
  const userData = useAppSelector((state) => state.user);
  
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
        duration: 5000,
      });
      router.push('/auth/signin');
      return;
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

  const handleVerify = async () => {
    if (!mounted) return;
    
    if (!userId) {
      toast({
        title: 'Error',
        description: 'Invalid verification link. Please try signing in again.',
        variant: 'destructive',
        duration: 5000,
      });
      router.push('/auth/signin');
      return;
    }

    if (otp.length !== 6) {
      toast({
        title: 'Incomplete OTP',
        description: 'Please enter the full 6-digit code',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Attempting verification with:', { userId, otp });
      
      const response = await axios.post(
        `https://ekustudy.onrender.com/auth/verify-login/${userId}`,
        { otp },
        { 
          withCredentials: true,
          timeout: 10000
        }
      );

      console.log('Verification response:', response.data);

      // Accept both 200 (OK) and 201 (Created) as successful responses
      if (response.status === 200 || response.status === 201) {
        // Update user authentication status in Redux
        dispatch(setUserData({
          isAuthenticated: true,
          _id: userData._id,
          fullName: userData.fullName,
          email: userData.email,
          username: userData.username
        }));

        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify({
          isAuthenticated: true,
          _id: userData._id,
          fullName: userData.fullName,
          email: userData.email,
          username: userData.username
        }));

        toast({
          title: 'Verification successful!',
          description: 'Your account has been verified. Redirecting to dashboard...',
          duration: 3000,
        });

        setTimeout(() => router.push('/dashboard'), 3000);
      } else {
        console.warn(`Received unexpected status code: ${response.status}`);
        // For other 2xx status codes, still proceed as success
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Verification error:', error);
      
      let errorMessage = 'Invalid OTP. Please try again.';
      let shouldRedirect = false;

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = error.response.data.message || 'Invalid OTP format';
          } else if (error.response.status === 401) {
            errorMessage = 'Session expired. Please sign in again.';
            shouldRedirect = true;
          } else if (error.response.status === 404) {
            errorMessage = 'User not found. Please sign up again.';
            shouldRedirect = true;
          } else if (error.response.status === 410) {
            errorMessage = 'OTP expired. Please request a new one.';
            setCanResend(true);
          } else if (error.response.data?.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = 'Request timeout. Please check your connection.';
        }
      }

      toast({
        title: 'Verification failed',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });

      if (shouldRedirect) {
        router.push('/auth/signin');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || !userId || !mounted) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        'https://ekustudy.onrender.com/auth/resend-otp', 
        { userId },
        { withCredentials: true }
      );
      
      toast({
        title: 'OTP Resent',
        description: 'A new verification code has been sent to your email.',
        duration: 3000,
      });
      
      setTimer(180);
      setCanResend(false);
    } catch (error) {
      console.error('Resend OTP error:', error);
      
      let errorMessage = 'Please try again later.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: 'Failed to resend OTP',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
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
              render={({ slots }) => (
                <>
                  {slots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-14 border-2 rounded-lg flex items-center justify-center ${
                        slot.isActive
                          ? 'border-deepGreen ring-2 ring-deepGreen/30'
                          : 'border-gray-300'
                      }`}
                    >
                      {slot.char}
                    </div>
                  ))}
                </>
              )}
            />
          </div>

          <Button
            onClick={handleVerify}
            className="w-full bg-green text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors shadow-sm hover:bg-deepGreen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deepGreen focus-visible:ring-offset-2"
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
                  className="text-green hover:text-deepGreen font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
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