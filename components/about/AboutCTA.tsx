'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function AboutCTA() {
  return (
    <section className="text-center py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-xl text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of LASUSTECH students who are already studying smarter with EkoStudy.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 bg-white text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
          >
            <span>Get Started for Free</span>
            <FaArrowRight className="ml-2" />
          </Link>
          <Link
            href="/features"
            className="px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-white hover:text-emerald-700 transition-colors"
          >
            <span>Explore Features</span>
          </Link>
          <Link
            href="/become-tutor"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <span>Become a Tutor</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}