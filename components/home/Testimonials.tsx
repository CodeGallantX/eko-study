"use client";

import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGraduationCap } from "react-icons/fa";
import Image from "next/image";

interface Testimonial {
  name: string;
  details: string;
  role: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ngozi F.",
    details:
      "I had three carryovers before I discovered EkoStudy. This semester? Zero. The past questions and summaries were gold.",
    role: "Microbiology, 400L",
    imageUrl: "https://randomuser.me/api/portraits/women/61.jpg",
  },
  {
    name: "Daniel U.",
    details:
      "As a fresher, I was completely lost. But EkoStudy guided me like Google Maps. I found my timetable, joined my class group, and even made friends.",
    role: "Mechanical Engineering, 100L",
    imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Zainab O.",
    details:
      "I once submitted a group assignment straight from the lecture notes I found on EkoStudy. The lecturer even asked where I got it — I just smiled.",
    role: "Mass Communication, 200L",
    imageUrl: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    name: "Ridwan B.",
    details:
      "I was always borrowing handouts before. Now, I just open EkoStudy and everything dey. No more looking for people to 'snap note for me'.",
    role: "Accounting, 200L",
    imageUrl: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    name: "Fatima K.",
    details:
      "Being able to access notes for other departments helped me pass my elective courses. Game changer. I owe my CGPA a thank you.",
    role: "Business Admin, 200L",
    imageUrl: "https://randomuser.me/api/portraits/women/84.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    arrows: false,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
  };

  const handleImageClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <section
      id="testimonials"
      className="bg-[#e6e1d1] dark:bg-[#1c1c1c] py-20 px-6 lg:px-36"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#4c5f4e] dark:text-[#ffca0d] flex items-center justify-center gap-2">
          <FaGraduationCap className="text-[#ffca0d]" /> What Students Say
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mt-4">
          Real voices from LASUSTECH students who use EkoStudy to level up.
        </p>
      </div>

      <div className="flex flex-col lg:grid grid-cols-2 gap-10">
        {/* Avatars */}
        <div className="hidden lg:grid grid-cols-5 gap-4 items-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`w-20 h-20 rounded-full overflow-hidden transition-all duration-300 transform cursor-pointer hover:scale-110 ${
                activeIndex === index
                  ? "scale-125 border-4 border-[#ffca0d]"
                  : "scale-90"
              }`}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized // For external images
              />
            </div>
          ))}
        </div>

        {/* Testimonial Content */}
        <div className="w-full lg:max-w-2xl mx-auto">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white dark:bg-[#2c2c2c] shadow-xl rounded-xl p-8 flex flex-col gap-4 border border-[#4c5f4e]/10">
                  <p className="text-lg text-gray-800 dark:text-gray-100 italic">
                    {testimonial.details}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#4c5f4e]"
                      unoptimized // For external images
                    />
                    <div>
                      <h4 className="text-xl font-bold text-[#4c5f4e] dark:text-[#ffca0d]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}