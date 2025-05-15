import ResetPasswordForm from './ResetPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

interface Props {
  searchParams: {
    token?: string;
  };
}

export default function ResetPasswordPage({ searchParams }: Props) {
  // Ensure token is a string (handle array case if needed)
  const token = Array.isArray(searchParams.token) 
    ? searchParams.token[0] 
    : searchParams.token;

  return <ResetPasswordForm token={token} />;
}