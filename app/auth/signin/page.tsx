'use client';

import React, { useEffect, useState } from 'react';
import Preloader from "@/components/shared/Preloader";
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/store';
import { SignInForm } from "@/components/auth/SignInForm";
import { SignInFormMobile } from "@/components/auth/SignInFormMobile";
import Image from "next/image";
import { supabase } from '@/lib/supabase';

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check auth state with Supabase
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          router.push('/dashboard');
        } else {
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setIsCheckingAuth(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push('/dashboard');
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [router, isAuthenticated]);

  if (isCheckingAuth) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sign In Form */}
      <div className="hidden md:block w-full max-w-md lg:max-w-none lg:w-1/2 flex flex-col items-center justify-center p-6">
        <SignInForm />
      </div>
      
      {/* Mobile Sign In Form */}
      <div className="block md:hidden w-full flex flex-col items-center justify-center">
        <SignInFormMobile />
      </div>
      
      {/* Illustration (Desktop only) */}
      <div className="hidden lg:block w-1/2 p-6">
        <div className="relative h-[500px] w-full">
          <Image
            src="/images/signin-illustration.svg"
            alt="Sign In Illustration"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}