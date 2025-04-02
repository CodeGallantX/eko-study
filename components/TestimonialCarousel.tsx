'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TestimonialCarousel({ testimonials }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <div className="flex items-center mb-4">
            {[...Array(testimonials[current].rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-lg italic mb-6">&ldquo;{testimonials[current].text}&rdquo;</p>
          <div>
            <p className="font-bold">{testimonials[current].name}</p>
            <p className="text-gray-600">{testimonials[current].department}</p>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${current === index ? 'bg-[#4c5f4e]' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}