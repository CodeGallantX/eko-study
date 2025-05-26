"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaGraduationCap, FaBookOpen, FaUsers, FaLightbulb
  //  FaChartLine 
  } from "react-icons/fa";

const features = [
  {
    icon: <FaGraduationCap className="w-6 h-6" />,
    text: "500+ Courses"
  },
  {
    icon: <FaBookOpen className="w-6 h-6" />,
    text: "Study Materials"
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    text: "10,000+ Students"
  },
  {
    icon: <FaLightbulb className="w-6 h-6" />,
    text: "AI-Powered Learning"
  }
];

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#e8ede6] dark:bg-[#1a1a1a] py-28 pt-36">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Blobs */}
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-[#e6e1d1] dark:bg-[#333] rounded-full filter blur-3xl opacity-50"
          initial={{ x: "-30%", y: "-20%", scale: 1, rotate: 0 }}
          animate={{ 
            x: ["-20%", "10%", "-10%"], 
            y: ["-10%", "20%", "-10%"], 
            scale: [1, 1.3, 1], 
            rotate: [0, 15, -15, 0] 
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] bg-[#92B76D] dark:bg-[#444] rounded-full filter blur-3xl opacity-50 bottom-10 right-10"
          initial={{ x: "30%", y: "20%", scale: 1, rotate: 0 }}
          animate={{ 
            x: ["20%", "-10%", "15%"], 
            y: ["10%", "-15%", "10%"], 
            scale: [1, 1.4, 1], 
            rotate: [0, -20, 20, 0] 
          }}
          transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[150px] h-[150px] bg-[#ffca0d] dark:bg-[#555] rounded-full filter blur-3xl opacity-50 top-20 left-20"
          initial={{ x: "-20%", y: "30%", scale: 1, rotate: 0 }}
          animate={{ 
            x: ["-15%", "15%", "-10%"], 
            y: ["30%", "10%", "20%"], 
            scale: [1, 1.2, 1], 
            rotate: [0, 10, -10, 0] 
          }}
          transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>

      <div className="px-10 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-[#4c5f4e]/10 text-[#4c5f4e] dark:text-[#e8ede6] rounded-full text-sm font-medium"
            >
              Revolutionizing Academic Success
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-[#4c5f4e] dark:text-[#e8ede6] leading-tight">
              Elevate Your <span className="text-[#92B76D]">Academic Journey</span> with Smart Learning
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-xl"
            >
              EkoStudy transforms your university experience with AI-powered study tools, comprehensive resources, and collaborative learning environments designed to maximize your academic potential.
            </motion.p>

            

            {/* Feature Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <span className="text-[#4c5f4e] dark:text-[#ffca0d]">{feature.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link href="/auth/signup">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 bg-[#4c5f4e] text-white rounded-lg font-semibold shadow-lg hover:bg-[#92B76D] transition-colors"
                >
                  Start Learning Today
                  <FaArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/resources/notes">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/80 dark:bg-black/40 backdrop-blur-sm text-[#4c5f4e] dark:text-white rounded-lg font-semibold shadow-lg hover:bg-[#ffca0d] hover:text-white transition-colors"
                >
                  Access Notes
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="University students collaborating on EkoStudy platform"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-black/90 backdrop-blur-sm p-6 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-[#4c5f4e] dark:text-[#ffca0d]">500+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                  </div>
                  <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-[#4c5f4e] dark:text-[#ffca0d]">10K+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                  </div>
                  <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-[#4c5f4e] dark:text-[#ffca0d]">50+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Universities</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
