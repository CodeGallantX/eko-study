import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - EkoStudy',
  description: 'Rules you agree to by using EkoStudy.',
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {children}
    </div>
  );
}
