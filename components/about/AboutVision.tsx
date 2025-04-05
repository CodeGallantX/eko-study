"use client";

import { motion } from 'framer-motion';
import { visionItems } from '../../data/about';

export default function AboutVision() {
  return (
    <section className="mb-20 bg-gray-50 rounded-xl p-12">
      <div className="text-center mb-12">
        <h6 className="text-lg font-semibold text-emerald-700 mb-2">Our Vision</h6>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Shaping the Future of LASUSTECH Education</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          We envision a LASUSTECH where every student has personalized learning tools at their fingertips, where academic success is not limited by access to resources, and where technology enhances rather than replaces traditional learning methods.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visionItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}