"use client";

import { motion } from "framer-motion";
import { FaBook, FaChartLine, FaUserGraduate, FaSearch, FaClock, FaUsers } from "react-icons/fa";

const features = [
  { 
    id: 1, 
    icon: <FaBook size={28} />, 
    title: "Multiple Learning Modes", 
    description: "Access materials in various formats – PDFs, videos, quizzes, and live sessions for a tailored learning experience." 
  },
  { 
    id: 2, 
    icon: <FaChartLine size={28} />, 
    title: "Better Grades & Performance", 
    description: "AI-powered recommendations help students create structured study plans for improved academic results." 
  },
  { 
    id: 3, 
    icon: <FaUserGraduate size={28} />, 
    title: "Student-Centered Experience", 
    description: "Personalized study paths, notifications, and dedicated forums to make learning more engaging and convenient." 
  },
  { 
    id: 4, 
    icon: <FaSearch size={28} />, 
    title: "Smart Search & Quick Access", 
    description: "Easily find lecture notes, past questions, and essential academic materials with an advanced search system." 
  },
  { 
    id: 5, 
    icon: <FaClock size={28} />, 
    title: "Study Reminders & Productivity Tools", 
    description: "Stay on top of your schedule with reminders for lectures, assignments, and study sessions." 
  },
  { 
    id: 6, 
    icon: <FaUsers size={28} />, 
    title: "Peer Collaboration & Mentorship", 
    description: "Join study groups, connect with mentors, and discuss challenging topics with fellow students." 
  },
];

export default function KeyFeatures() {
  return (
    <section className="relative w-full py-16 bg-white dark:bg-[#1a1a1a]">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4c5f4e] to-[#e8ede6] opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#4c5f4e] dark:text-[#ffca0d]">
            Key <span className="text-[#ffca0d] dark:text-white">Features & Benefits</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Unlock the full potential of EkoStudy – designed to enhance your learning experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id} 
              className="p-6 bg-white/80 dark:bg-black/30 backdrop-blur-lg shadow-lg rounded-2xl flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-[#4c5f4e] dark:text-[#ffca0d]">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-black dark:text-white mt-3">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
