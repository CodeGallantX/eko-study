import ResetPasswordForm from './ResetPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

interface PageProps {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: PageProps) {
  return <ResetPasswordForm token={searchParams.token} />;
}