"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PiCaretDown } from 'react-icons/pi';
import { faqs } from '../../data/about';

export default function AboutFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h6 className="text-lg font-semibold text-emerald-700 mb-2">Have Questions?</h6>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="flex justify-between items-center w-full text-left font-semibold text-lg py-4 focus:outline-none hover:text-emerald-700 transition-colors"
            >
              <span>{faq.question}</span>
              <PiCaretDown className={`w-5 h-5 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`} />
            </button>

            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-4 text-gray-700">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}