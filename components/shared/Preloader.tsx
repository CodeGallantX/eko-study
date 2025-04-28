"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  onLoaded?: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      if (onLoaded) onLoaded();
      
      // After the fade-out animation completes, hide the preloader completely
      setTimeout(() => {
        setIsHidden(true);
      }, 1000); // This matches the transition duration
    }, 4000); // Keep animation for 4 seconds before fading out
  }, [onLoaded]);

  if (isHidden) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-beige dark:bg-[#1a1a1a] flex items-center justify-center z-50"
      style={{ opacity: isLoaded ? 0 : 1, transition: 'opacity 1s ease-in-out' }}
    >
      <div className="relative">
        <div data-loader="logo-circle"></div>
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image 
            src="/yellow-logo.png" 
            alt="EkoStudy Logo" 
            width={150} 
            height={150} 
            className="w-[150px] h-[150px]"
          />
        </div> */}
      </div>
    </div>
  );
}
