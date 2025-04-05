"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function AboutHero() {
  return (
    <section className="mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Empowering LASUSTECH Students Through Innovative Learning</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
          EkoStudy is the premier digital learning platform exclusively for Lagos State University of Science and Technology (LASUSTECH) students.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link 
            href="/signup" 
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
          >
            <span>Sign Up Free</span>
            <FaArrowRight className="ml-2" />
          </Link>
          <Link 
            href="/features" 
            className="px-6 py-3 bg-white text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <span>Explore Features</span>
          </Link>
          <Link 
            href="/become-tutor" 
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <span>Become a Tutor</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}