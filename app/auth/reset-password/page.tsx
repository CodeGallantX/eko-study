// app/auth/reset-password/page.tsx
'use client';

import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import Preloader from '@/components/shared/Preloader';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <ResetPasswordWrapper />
    </Suspense>
  );
}

function ResetPasswordWrapper() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? undefined;

  return <ResetPasswordForm token={token} />;
}