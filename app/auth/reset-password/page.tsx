import ResetPasswordPage from './ResetPasswordClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  return <ResetPasswordPage searchParams={searchParams} />;
}