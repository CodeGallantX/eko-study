'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      router.replace(`/auth/reset-password?token=${token}`);
    } else {
      router.replace('/auth/forgot-password');
    }
  }, [router, token]);

  return null;
} 