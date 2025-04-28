'use client';

import React, { useEffect, useState } from 'react';
import Preloader from "@/components/shared/Preloader"
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SignInForm } from "@/components/auth/SignInForm";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('auth_token');
      
      if (userData && token) {
        router.push('/dashboard');
      } else {
        setIsCheckingAuth(false);
      }
    } else {
      setIsCheckingAuth(false);
    }
  }, [router, isAuthenticated]);

  if (isCheckingAuth) {
    return (
      <Preloader />
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md lg:max-w-none lg:w-1/2 flex flex-col items-center justify-center p-6">
        <SignInForm />
      </div>
      
      <div className="hidden lg:block w-1/2 p-6">
        <div className="relative h-[500px] w-full">
          <Image
            src="/images/signin-illustration.svg"
            alt="Sign In Illustration"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}