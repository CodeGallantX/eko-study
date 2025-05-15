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

export default function ResetPasswordPage(props: PageProps) {
  const token = props.searchParams.token;
  return <ResetPasswordForm token={token} />;
}