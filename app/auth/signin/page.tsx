'use client';
import { SignInForm } from '@/components/auth/SignInForm';
import SideIllustration from '@/components/shared/SideIllustration';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center p-4">
      <SideIllustration />
      <SignInForm />
    </div>
  );
}