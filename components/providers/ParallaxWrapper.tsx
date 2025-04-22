'use client';

import { Parallax } from 'react-scroll-parallax';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
}

export function ParallaxWrapper({ children, speed = -5 }: ParallaxWrapperProps) {
  return (
    <Parallax speed={speed}>
      {children}
    </Parallax>
  );
} 