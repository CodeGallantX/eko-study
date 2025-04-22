'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ParallaxWrapper } from '@/components/providers/ParallaxWrapper';
import { FaLightbulb, FaChartLine, FaUsers } from 'react-icons/fa';

export default function AboutMission() {
  return (
    <section className="mb-20 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing education through innovative technology and collaborative learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ParallaxWrapper>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Students collaborating on EkoStudy"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium">Students collaborating on EkoStudy</p>
              </div>
            </motion.div>
          </ParallaxWrapper>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Revolutionizing Education</h3>
            <div className="space-y-6 text-gray-700">
              <p>At EkoStudy, we&apos;re committed to transforming how students learn, study, and succeed. Our mission is threefold:</p>
              
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <FaLightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Centralize academic resources</h4>
                    <p>Bringing all essential study materials into one easily accessible platform</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <FaChartLine className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Enhance learning efficiency</h4>
                    <p>Through AI-powered tools that personalize the study experience</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <FaUsers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Foster academic community</h4>
                    <p>Creating spaces for collaboration and knowledge sharing across departments</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-4"
              >
                We&apos;re committed to providing LASUSTECH students with the best possible learning experience.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}