'use client';

import { motion } from 'framer-motion';
import { FaAccessibleIcon, FaLightbulb, FaUsers } from 'react-icons/fa';

export default function AboutVision() {
  return (
    <section className="mb-20 py-12 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building the future of education through innovation and accessibility
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all"
          >
            <div className="bg-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <FaAccessibleIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Accessibility</h3>
            <p className="text-gray-600">
              Making quality education accessible to every student, regardless of location or economic background.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all"
          >
            <div className="bg-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <FaLightbulb className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Innovation</h3>
            <p className="text-gray-600">
              Continuously developing cutting-edge tools that address the real challenges students face in their academic journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all"
          >
            <div className="bg-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
              <FaUsers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Community</h3>
            <p className="text-gray-600">
              Building a supportive network where students can learn from each other and grow together.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}