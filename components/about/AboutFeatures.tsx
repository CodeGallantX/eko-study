'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaBook, FaFileAlt, FaDownload, FaUsers, FaChartLine } from 'react-icons/fa';

export default function AboutFeatures() {
  const features = [
    {
      title: "AI-Powered Study Assistant",
      description: "Get personalized study recommendations based on your courses and performance.",
      icon: <FaRobot className="w-10 h-10 text-green-600" />
    },
    {
      title: "Department-Specific Resources",
      description: "Access curated materials for your exact department and courses.",
      icon: <FaBook className="w-10 h-10 text-green-600" />
    },
    {
      title: "Exam Preparation Suite",
      description: "Past questions, marking schemes, and timed practice tests.",
      icon: <FaFileAlt className="w-10 h-10 text-green-600" />
    },
    {
      title: "Offline Access",
      description: "Download materials for studying without internet connection.",
      icon: <FaDownload className="w-10 h-10 text-green-600" />
    },
    {
      title: "Collaborative Learning",
      description: "Departmental discussion forums and study groups.",
      icon: <FaUsers className="w-10 h-10 text-green-600" />
    },
    {
      title: "Progress Tracking",
      description: "Monitor your study habits and improvement over time.",
      icon: <FaChartLine className="w-10 h-10 text-green-600" />
    }
  ];

  return (
    <section className="mb-20 py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h6 className="text-lg font-semibold text-green-700 mb-2 inline-block px-4 py-1 bg-green-100 rounded-full">Why Choose EkoStudy?</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Comprehensive Features Designed for Student Success</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers a suite of powerful tools to enhance your learning experience and academic performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all hover:border-green-300 group"
            >
              <motion.div 
                className="flex justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-center text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}