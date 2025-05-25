'use client';

import ResetPasswordForm from './ResetPasswordForm';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? undefined;

  return <ResetPasswordForm token={token} />;
}