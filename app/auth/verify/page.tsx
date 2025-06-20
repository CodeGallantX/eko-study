'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
}

const OTPInput = ({ value, onChange, length = 6, className = '' }: OTPInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = value.split('');
    newValue[index] = e.target.value.slice(-1);
    onChange(newValue.join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-14 border-2 rounded-lg flex items-center justify-center text-center text-xl 
                    focus:border-deepGreen focus:ring-2 focus:ring-deepGreen/30 focus:outline-none
                    transition-colors duration-200"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setEmail(user?.email || '');
      } catch (error) {
        console.error('Error getting user email:', error);
      }
    };
    getUserEmail();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Incomplete OTP',
        description: 'Please enter the full 6-digit code',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: 'Verification successful!',
        description: 'Your account has been verified.',
      });
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid OTP. Please try again.';
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
    if (!canResend) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: 'OTP Resent',
        description: 'A new verification code has been sent to your email.',
      });
      
      setTimer(180);
      setCanResend(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend OTP. Please try again later.';
      toast({
        title: 'Failed to resend OTP',
        description: errorMessage,
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
            We&apos;ve sent a 6-digit code to {email}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <OTPInput
              value={otp}
              onChange={setOtp}
              length={6}
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