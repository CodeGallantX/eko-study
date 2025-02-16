"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center px-6 lg:px-20 bg-[#e8ede6] dark:bg-[#1a1a1a] overflow-hidden">
      
      {/* Background Blurry Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-[300px] h-[300px] bg-[#e6e1d1] dark:bg-[#333] rounded-full filter blur-3xl opacity-50"
          initial={{ x: "-30%", y: "-20%", scale: 1 }}
          animate={{ x: ["-20%", "10%", "-10%"], y: ["-10%", "20%", "-10%"], scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[200px] h-[200px] bg-[#92B76D] dark:bg-[#444] rounded-full filter blur-3xl opacity-50 bottom-10 right-10"
          initial={{ x: "30%", y: "20%", scale: 1 }}
          animate={{ x: ["20%", "-10%", "15%"], y: ["10%", "-15%", "10%"], scale: [1, 1.3, 1] }}
          transition={{ duration:4 , repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[250px] h-[250px] bg-[#ffca0d] dark:bg-[#555] rounded-full filter blur-3xl opacity-50 top-20 left-20"
          initial={{ x: "-20%", y: "30%", scale: 1 }}
          animate={{ x: ["-15%", "15%", "-10%"], y: ["30%", "10%", "20%"], scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
