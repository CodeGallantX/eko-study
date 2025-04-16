'use client';

import { ParallaxProvider as ReactParallaxProvider } from 'react-scroll-parallax';

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactParallaxProvider>
      {children}
    </ReactParallaxProvider>
  );
} 