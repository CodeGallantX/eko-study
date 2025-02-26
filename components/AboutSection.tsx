"use client";

import { motion } from "framer-motion";
import { FaBookOpen, FaGraduationCap, FaUsers } from "react-icons/fa";

const stats = [
  { id: 1, icon: <FaBookOpen size={40} />, label: "Courses Available", value: "200+" },
  { id: 2, icon: <FaGraduationCap size={40} />, label: "Departments Covered", value: "20+" },
  { id: 3, icon: <FaUsers size={40} />, label: "Students Enrolled", value: "5,000+" },
];

export default function AboutEkoStudy() {
  return (
    <section className="relative w-full py-16 bg-[#e8ede6] dark:bg-[#1a1a1a] overflow-hidden">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4c5f4e] to-[#e8ede6] dark:from-[#1a1a1a] dark:to-[#4c5f4e] opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#4c5f4e] dark:text-[#ffca0d]">
            Why <span className="text-[#ffca0d] dark:text-white">EkoStudy?</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            &ldquo;Our goal is to revolutionize learning at LASUSTECH by providing structured, accessible, and AI-enhanced study materials.&rdquo;          </p>
        </motion.div>

        {/* Purpose Section */}
        <motion.div 
          className="bg-white dark:bg-black/30 backdrop-blur-lg shadow-lg rounded-2xl p-6 md:p-10 mb-12 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed">
            EkoStudy is designed to empower LASUSTECH students with a seamless, structured learning experience.
            From lecture notes to past questions and AI-powered study tools, we ensure that students have everything they need to succeed academically.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="p-8 bg-white dark:bg-black/30 backdrop-blur-lg shadow-xl rounded-3xl flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              <div className="text-[#4c5f4e] dark:text-[#ffca0d] mb-3">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-black dark:text-white">{stat.value}</h3>
              <p className="text-gray-700 dark:text-gray-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}