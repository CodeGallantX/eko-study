'use client';
import { SignInForm } from '@/components/auth/SignInForm';
import SideIllustration from '@/components/shared/SideIllustration';

export default function SignInPage() {
  return (
    <div className="min-h-screen gri d grid-cols-2">
      <SideIllustration />
      <SignInForm />
    </div>
  );
}