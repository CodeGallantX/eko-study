"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

export default function AboutStats() {
  const controls = useAnimation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({
    materials: 0,
    departments: 0,
    students: 0
  });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000;
      const start = Date.now();
      const targets = {
        materials: 10000,
        departments: 15,
        students: 300
      };

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);

        setCounters({
          materials: Math.floor(progress * targets.materials),
          departments: Math.floor(progress * targets.departments),
          students: Math.floor(progress * targets.students)
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [isStatsInView]);

  return (
    <section 
      ref={statsRef}
      className="mb-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-sm"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4"
          animate={controls}
        >
          <h3 className="text-4xl font-bold text-green mb-2">
            {counters.materials.toLocaleString()}+
          </h3>
          <p className="text-gray-600">Study Materials</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4"
          animate={controls}
        >
          <h3 className="text-4xl font-bold text-green mb-2">
            {counters.departments}+
          </h3>
          <p className="text-gray-600">Departments Covered</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4"
          animate={controls}
        >
          <h3 className="text-4xl font-bold text-green mb-2">
            {counters.students.toLocaleString()}+
          </h3>
          <p className="text-gray-600">Active Students</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4"
        >
          <h3 className="text-4xl font-bold text-green mb-2">24/7</h3>
          <p className="text-gray-600">Accessibility</p>
        </motion.div>
      </div>
    </section>
  );
}