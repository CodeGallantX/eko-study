"use client";

import { motion } from "framer-motion";
import { FaBook, FaChartLine, FaUserGraduate, FaSearch, FaClock, FaUsers } from "react-icons/fa";

const features = [
  { 
    id: 1, 
    icon: <FaBook size={32} />, 
    title: "Multiple Learning Modes", 
    description: "Access study materials in various formats – PDFs, videos, quizzes, and live sessions for a customized learning experience." 
  },
  { 
    id: 2, 
    icon: <FaChartLine size={32} />, 
    title: "Better Grades & Performance", 
    description: "AI-powered recommendations help students structure their study plans for improved academic outcomes." 
  },
  { 
    id: 3, 
    icon: <FaUserGraduate size={32} />, 
    title: "Student-Centered Experience", 
    description: "Personalized learning paths, notifications, and forums to make studying more interactive and convenient." 
  },
  { 
    id: 4, 
    icon: <FaSearch size={32} />, 
    title: "Smart Search & Quick Access", 
    description: "Find lecture notes, past questions, and study materials instantly with an advanced search system." 
  },
  { 
    id: 5, 
    icon: <FaClock size={32} />, 
    title: "Study Reminders & Productivity Tools", 
    description: "Stay on track with reminders for lectures, assignments, and study sessions to boost productivity." 
  },
  { 
    id: 6, 
    icon: <FaUsers size={32} />, 
    title: "Peer Collaboration & Mentorship", 
    description: "Join study groups, connect with mentors, and discuss topics with fellow students for collective learning." 
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative w-full py-20 bg-white">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4c5f4e] to-[#e8ede6] opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#4c5f4e] dark:text-[#ffca0d]">
            Key <span className="text-[#ffca0d] dark:text-white">Features & Benefits</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Unlock the full potential of EkoStudy – your ultimate academic companion designed for success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id} 
              className="p-8 bg-white dark:bg-black/40 backdrop-blur-md shadow-xl rounded-2xl flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-[#4c5f4e] dark:text-[#ffca0d] mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-black dark:text-white">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 mt-3">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
