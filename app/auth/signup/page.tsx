'use client';
import { SignUpForm } from '@/components/auth/SignUpForm';
import SideIllustration from '@/components/shared/SideIllustration';

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <SideIllustration />
      <SignUpForm />
    </div>
  );
}