// components/auth/AuthLayout.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  illustrationSrc: string;
  illustrationAlt: string;
}

export const AuthLayout = ({
  children,
  illustrationSrc,
  illustrationAlt,
}: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Illustration side - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 items-center justify-center p-12 bg-gradient-to-br from-gray-900 to-gray-800"
      >
        <div className="relative w-full h-full max-w-2xl">
          <Image
            src={illustrationSrc}
            alt={illustrationAlt}
            fill
            className="object-contain opacity-90"
            priority
          />
        </div>
      </motion.div>

      {/* Form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};