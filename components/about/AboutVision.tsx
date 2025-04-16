'use client';

import { motion } from 'framer-motion';
import { visionItems } from '@/data/about';

export default function AboutVision() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-xl text-gray-600">Building the future of education at LASUSTECH</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visionItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-emerald-600 mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}