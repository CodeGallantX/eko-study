"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiStarFill, PiPlay, PiPause } from 'react-icons/pi';
import { testimonials } from '../../data/about';

export default function AboutTestimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]); // Removed testimonials.length from dependencies

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h6 className="text-lg font-semibold text-emerald-700 mb-2">Success Stories</h6>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">What LASUSTECH Students Say About EkoStudy</h2>
      </div>

      <div className="relative max-w-4xl mx-auto" ref={testimonialRef}>
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, type: "spring", damping: 10 }}
              className="bg-white p-8 rounded-xl shadow-md"
              drag="x"
              dragConstraints={testimonialRef}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) {
                  setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
                } else if (swipe > 10000) {
                  setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
                }
              }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <PiStarFill key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg italic mb-6">&quot;{testimonials[currentTestimonial].text}&quot;</p>
              <div>
                <p className="font-bold">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[currentTestimonial].department}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 space-x-4 items-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PiPause /> : <PiPlay />}
          </button>

          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTestimonial(index);
                setIsPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-emerald-700' : 'bg-gray-300'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}