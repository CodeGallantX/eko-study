import ResetPasswordForm from './ResetPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

interface SearchParams {
  token?: string;
}

export default function ResetPasswordPage({ 
  searchParams 
}: { 
  searchParams: SearchParams 
}) {
  return <ResetPasswordForm token={searchParams.token} />;
}