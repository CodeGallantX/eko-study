"use client";

import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaUsers } from "react-icons/fa";

const stats = [
  { id: 1, icon: <FaBookOpen size={30} />, label: "Courses Available", value: "200+" },
  { id: 2, icon: <FaGraduationCap size={30} />, label: "Departments Covered", value: "20+" },
  { id: 3, icon: <FaUsers size={30} />, label: "Students Enrolled", value: "5,000+" },
];

export default function AboutEkoStudy() {
  return (
    <section className="relative w-full py-16 bg-[#e8ede6] dark:bg-[#1a1a1a]">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4c5f4e] to-[#e8ede6] opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#4c5f4e] dark:text-[#ffca0d]">
            Why <span className="text-[#ffca0d] dark:text-white">EkoStudy?</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Your all-in-one academic hub designed exclusively for LASUSTECH students.  
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="p-6 bg-white/80 dark:bg-black/30 backdrop-blur-lg shadow-lg rounded-2xl flex flex-col items-center text-center"
            >
              <div className="text-[#4c5f4e] dark:text-[#ffca0d]">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-black dark:text-white mt-3">{stat.value}</h3>
              <p className="text-gray-700 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
