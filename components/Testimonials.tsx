"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaQuoteLeft, FaGraduationCap } from "react-icons/fa";

const testimonials = [
  {
    name: "David Oluwadare",
    level: "300L Computer Science",
    feedback: "EkoStudy has completely transformed the way I study. The structured courses and interactive materials have boosted my understanding and grades significantly!",
    image: "/students/david.jpg",
  },
  {
    name: "Sarah Adeyemi",
    level: "200L Business Administration",
    feedback: "I love how everything is so organized! The past questions and study groups have made my exam preparations much smoother.",
    image: "/students/sarah.jpg",
  },
  {
    name: "Michael Ajibola",
    level: "400L Mechanical Engineering",
    feedback: "The AI-powered recommendations and easy access to lecture notes are game-changers. EkoStudy truly understands students’ needs!",
    image: "/students/michael.jpg",
  },
  {
    name: "Esther Okonkwo",
    level: "100L Mass Communication",
    feedback: "As a fresher, EkoStudy helped me transition smoothly into university life. The mentorship programs are amazing!",
    image: "/students/esther.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-16 bg-[#e6e1d1]/50 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4c5f4e] to-[#e8ede6] opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#4c5f4e] dark:text-[#ffca0d] flex items-center justify-center gap-2">
            <FaGraduationCap className="text-[#ffca0d]" /> What Students Say
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Real stories from LASUSTECH students who use EkoStudy to achieve academic success.
          </p>
        </motion.div>

        {/* Swiper Testimonial Slider */}
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          loop={true}
          className="max-w-3xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center transition-all flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="absolute top-2 left-5 text-4xl text-[#4c5f4e] opacity-30" />

                {/* Student Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full border-4 border-[#ffca0d] object-cover mb-4"
                />

                {/* Feedback */}
                <p className="text-lg text-gray-800 dark:text-gray-200 italic">
                  &ldquo;{testimonial.feedback}&rdquo;
                </p>

                {/* Name & Level */}
                <h3 className="text-xl font-bold text-[#4c5f4e] dark:text-[#ffca0d] mt-4">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.level}</p>

                {/* Quote Icon */}
                <FaQuoteLeft className="absolute bottom-2 right-5 text-4xl text-[#4c5f4e] opacity-30 rotate-180" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
