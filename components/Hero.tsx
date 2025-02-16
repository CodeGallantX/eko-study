"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 lg:px-20 bg-[#e8ede6] dark:bg-[#1a1a1a]">
      {/* Background Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
          className="absolute bg-[#e6e1d1] dark:bg-[#333] w-[250px] h-[250px] rotate-45 top-10 right-10 opacity-40"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1.2 }}
          className="absolute bg-[#e6e1d1] dark:bg-[#444] w-[100px] h-[100px] rotate-45 bottom-10 left-10 opacity-40"
        />
      </div>

      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#4c5f4e] dark:text-[#e8ede6]">
          Welcome to <span className="text-[#92B76D]">EkoStudy</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Your all-in-one resource platform for LASUSTECH students. Access lecture notes, study guides, and interactive courses designed for success.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/courses">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#4c5f4e] text-white rounded-full shadow-lg hover:bg-[#92B76D] transition-all duration-300"
            >
              Browse Courses
            </motion.button>
          </Link>
          <Link href="/about">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#e6e1d1] dark:bg-gray-700 text-[#4c5f4e] dark:text-white rounded-full shadow-lg hover:bg-[#ffca0d] transition-all duration-300"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
