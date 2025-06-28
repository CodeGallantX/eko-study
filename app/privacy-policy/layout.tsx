import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - EkoStudy',
  description: 'How we handle your personal information and privacy on EkoStudy.',
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {children}
    </div>
  );
}
