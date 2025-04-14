"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader({ onLoaded }: { onLoaded?: () => void }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      if (onLoaded) onLoaded();
    }, 4000); // Keep animation for 4 seconds before fading out
  }, [onLoaded]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#e8ede6] dark:bg-[#1a1a1a] flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ pointerEvents: isLoaded ? "none" : "auto" }}
    >
      {/* Floating Graduation Cap */}
      <motion.div
        className="w-36 md:w-48"
        initial={{ y: -20, rotate: 0 }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0], // Subtle wobble
        }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <Image src="/yellow-logo.png" alt="EkoStudy Logo" width={150} height={150} />
      </motion.div>

      {/* Animated Text */}
      <motion.div className="relative mt-6 flex space-x-2">
        {["E", "k", "o", "S", "t", "u", "d", "y"].map((letter, index) => (
          <motion.span
            key={index}
            className="text-5xl md:text-6xl font-extrabold text-[#4c5f4e] dark:text-[#e8ede6]"
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, -10, 0], // Bouncing effect
              opacity: [0.5, 1, 0.5], // Fading effect
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.1, // Staggered effect for each letter
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Background Glow */}
      <motion.div
        className="absolute w-40 h-40 bg-yellow-500 opacity-20 blur-2xl"
        initial={{ scale: 1, opacity: 0.3 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: [-10, 10, -10], // Floating motion
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}
