import ResetPasswordForm from './ResetPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

export default async function ResetPasswordPage({ 
  searchParams 
}: { 
  searchParams: { token?: string } 
}) {
  return <ResetPasswordForm token={searchParams.token} />;
}