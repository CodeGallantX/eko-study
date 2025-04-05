"use client";
import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import Image from 'next/image';
=======
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Link from 'next/link';
<<<<<<< HEAD
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
=======
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { FaArrowRight } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { PiStarFill, PiCaretDown, PiUniversity, PiFile, PiUsers, PiChartLine, PiLightbulb, PiUsers as PiUsersIcon, PiPlay, PiPause } from 'react-icons/pi';

interface Page {
  title: string;
  breadcrumb: {
    name: string;
    path: string;
  }[];
}

interface Testimonial {
  id: number;
  name: string;
  department: string;
  text: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adeola Johnson",
    department: "Computer Science",
    text: "EkoStudy transformed my exam preparation. The past questions and AI study planner helped me score a 4.5 GPA last semester!",
    rating: 5
  },
  {
    id: 2,
    name: "Chinedu Okoro",
    department: "Mechanical Engineering",
    text: "The departmental resources saved me hours of searching for materials. Everything I need is in one place, perfectly organized.",
    rating: 5
  },
  {
    id: 3,
    name: "Fatima Yusuf",
    department: "Biochemistry",
    text: "I love the video explanations for complex topics. The offline access feature is a lifesaver for my commute.",
    rating: 4
  }
];

export default function AboutPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const controls = useAnimation();
  const testimonialRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const statsRef = useRef<HTMLDivElement>(null);
=======
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
  const [counters, setCounters] = useState({
    materials: 0,
    departments: 0,
    students: 0
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

<<<<<<< HEAD
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

=======
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
  // Auto-advance testimonials
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

<<<<<<< HEAD
  // Counter animation when stats come into view
  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000; // ms
      const start = Date.now();
      const targets = {
        materials: 10000,
        departments: 15,
        students: 5000
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

  const page: Page = {
    title: "About EkoStudy - LASUSTECH&apos;s Premier Learning Platform",
=======
  // Counter animation
  useEffect(() => {
    const animateCounters = async () => {
      await controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      });

      const duration = 2; // seconds
      const increments = 100;

      const animateCounter = (target: number, key: keyof typeof counters) => {
        const increment = target / increments;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, (duration * 1000) / increments);
      };

      animateCounter(10000, 'materials');
      animateCounter(15, 'departments');
      animateCounter(5000, 'students');
    };

    animateCounters();
  }, [controls]);

  const page: Page = {
    title: "About EkoStudy - LASUSTECH's Premier Learning Platform",
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    breadcrumb: [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "About",
        path: "/about",
      }
    ]
  };

  const faqs: FAQ[] = [
    {
      question: "Is EkoStudy free for LASUSTECH students?",
      answer: "Yes! EkoStudy offers free access to all core study materials for LASUSTECH students. Some premium features may be introduced in the future, but the essential resources will always remain free."
    },
    {
      question: "How often are new materials added to the platform?",
      answer: "We update our database continuously throughout each semester. Lecture notes are typically added within 48 hours of classes, and past questions are updated after each examination period."
    },
    {
      question: "Can I contribute my own notes to EkoStudy?",
      answer: "Absolutely! We encourage student contributions. You can submit your well-organized notes through our submission portal, where our academic team reviews them before publishing."
    },
    {
      question: "Does EkoStudy work offline?",
      answer: "Yes! Our offline mode allows you to download materials and access them without an internet connection. Perfect for studying during commutes or in areas with poor connectivity."
    }
  ];

  const visionItems = [
    {
      title: "Accessibility",
      description: "Making quality education accessible to every LASUSTECH student, regardless of location or economic background.",
<<<<<<< HEAD
      icon: <FaFacebookF className="text-4xl text-emerald-700" />
=======
      icon: <FaFacebookF className="text-4xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Innovation",
      description: "Continuously developing cutting-edge tools that address the real challenges students face in their academic journey.",
<<<<<<< HEAD
      icon: <PiLightbulb className="text-4xl text-emerald-700" />
=======
      icon: <PiLightbulb className="text-4xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Community",
      description: "Building a supportive network where students can learn from each other and grow together.",
<<<<<<< HEAD
      icon: <PiUsersIcon className="text-4xl text-emerald-700" />
=======
      icon: <PiUsersIcon className="text-4xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    }
  ];

  const features: Feature[] = [
    {
      title: "AI-Powered Study Assistant",
      description: "Get personalized study recommendations based on your courses and performance.",
<<<<<<< HEAD
      icon: <FaXTwitter className="text-3xl text-emerald-700" />
=======
      icon: <FaXTwitter className="text-3xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Department-Specific Resources",
      description: "Access curated materials for your exact department and courses.",
<<<<<<< HEAD
      icon: <PiUniversity className="text-3xl text-emerald-700" />
=======
      icon: <PiUniversity className="text-3xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Exam Preparation Suite",
      description: "Past questions, marking schemes, and timed practice tests.",
<<<<<<< HEAD
      icon: <PiFile className="text-3xl text-emerald-700" />
=======
      icon: <PiFile className="text-3xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Offline Access",
      description: "Download materials for studying without internet connection.",
<<<<<<< HEAD
      icon: <PiCaretDown className="text-3xl text-emerald-700" />
=======
      icon: <PiCaretDown className="text-3xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Collaborative Learning",
      description: "Departmental discussion forums and study groups.",
<<<<<<< HEAD
      icon: <PiUsers className="text-3xl text-emerald-700" />
=======
      icon: <PiUsers className="text-3xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    },
    {
      title: "Progress Tracking",
      description: "Monitor your study habits and improvement over time.",
<<<<<<< HEAD
      icon: <PiChartLine className="text-3xl text-emerald-700" />
=======
      icon: <PiChartLine className="text-3xl text-[#4c5f4e]" />
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
    }
  ];

  return (
    <ParallaxProvider>
      <div className="bg-white">
        <Header />
        <Banner page={page} />

        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
<<<<<<< HEAD
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Empowering LASUSTECH Students Through Innovative Learning</h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
=======
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Empowering LASUSTECH Students Through Innovative Learning</h1>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                EkoStudy is the premier digital learning platform exclusively for Lagos State University of Science and Technology (LASUSTECH) students.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
<<<<<<< HEAD
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
=======
                <Link href="/signup" className="btn-primary">
                  <span>Sign Up Free</span>
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link href="/features" className="btn-secondary">
                  <span>Explore Features</span>
                </Link>
                <Link href="/become-tutor" className="btn-tertiary">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                  <span>Become a Tutor</span>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Stats Section */}
<<<<<<< HEAD
          <section 
            ref={statsRef}
            className="mb-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-sm"
          >
=======
          <section className="mb-20 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-sm">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4"
                animate={controls}
              >
<<<<<<< HEAD
                <h3 className="text-4xl font-bold text-emerald-700 mb-2">
=======
                <h3 className="text-4xl font-bold text-[#4c5f4e] mb-2">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                  {counters.materials.toLocaleString()}+
                </h3>
                <p className="text-gray-600">Study Materials</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4"
                animate={controls}
              >
<<<<<<< HEAD
                <h3 className="text-4xl font-bold text-emerald-700 mb-2">
=======
                <h3 className="text-4xl font-bold text-[#4c5f4e] mb-2">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                  {counters.departments}+
                </h3>
                <p className="text-gray-600">Departments Covered</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4"
                animate={controls}
              >
<<<<<<< HEAD
                <h3 className="text-4xl font-bold text-emerald-700 mb-2">
=======
                <h3 className="text-4xl font-bold text-[#4c5f4e] mb-2">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                  {counters.students.toLocaleString()}+
                </h3>
                <p className="text-gray-600">Active Students</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4"
              >
<<<<<<< HEAD
                <h3 className="text-4xl font-bold text-emerald-700 mb-2">24/7</h3>
=======
                <h3 className="text-4xl font-bold text-[#4c5f4e] mb-2">24/7</h3>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                <p className="text-gray-600">Accessibility</p>
              </motion.div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Parallax speed={-5}>
                <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-lg">
<<<<<<< HEAD
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    alt="LASUSTECH students using EkoStudy"
                    fill
                    className="object-cover"
=======
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    alt="LASUSTECH students using EkoStudy"
                    className="object-cover w-full h-full"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                    loading="lazy"
                  />
                </div>
              </Parallax>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission: Revolutionizing LASUSTECH Education</h2>
                <div className="space-y-4 text-gray-700">
<<<<<<< HEAD
                  <p>At EkoStudy, we&apos;re committed to transforming how LASUSTECH students learn, study, and succeed. Our mission is threefold:</p>
=======
                  <p>At EkoStudy, we're committed to transforming how LASUSTECH students learn, study, and succeed. Our mission is threefold:</p>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                  <ul className="space-y-3 list-disc pl-5">
                    <li><strong>Centralize academic resources</strong> - Bringing all essential study materials into one easily accessible platform</li>
                    <li><strong>Enhance learning efficiency</strong> - Through AI-powered tools that personalize the study experience</li>
                    <li><strong>Foster academic community</strong> - Creating spaces for collaboration and knowledge sharing across departments</li>
                  </ul>
                  <p>We believe every LASUSTECH student deserves equal access to quality learning resources, regardless of their department or level.</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-20 bg-gray-50 rounded-xl p-12">
            <div className="text-center mb-12">
<<<<<<< HEAD
              <h6 className="text-lg font-semibold text-emerald-700 mb-2">Our Vision</h6>
=======
              <h6 className="text-lg font-semibold text-[#4c5f4e] mb-2">Our Vision</h6>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
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

          {/* Features Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
<<<<<<< HEAD
              <h6 className="text-lg font-semibold text-emerald-700 mb-2">Why Choose EkoStudy?</h6>
=======
              <h6 className="text-lg font-semibold text-[#4c5f4e] mb-2">Why Choose EkoStudy?</h6>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Features Designed for LASUSTECH Students</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
<<<<<<< HEAD
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-emerald-700 group"
=======
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-[#4c5f4e] group"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-20">
            <div className="text-center mb-12">
<<<<<<< HEAD
              <h6 className="text-lg font-semibold text-emerald-700 mb-2">Success Stories</h6>
=======
              <h6 className="text-lg font-semibold text-[#4c5f4e] mb-2">Success Stories</h6>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What LASUSTECH Students Say About EkoStudy</h2>
            </div>

            <div
              className="relative max-w-4xl mx-auto"
              ref={testimonialRef}
            >
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
<<<<<<< HEAD
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
=======
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-xl shadow-md"
                    drag="x"
                    dragConstraints={testimonialRef}
                    onDragEnd={(e, info) => {
                      if (info.offset.x > 50) {
                        setCurrentTestimonial(prev =>
                          prev === 0 ? testimonials.length - 1 : prev - 1
                        );
                      } else if (info.offset.x < -50) {
                        setCurrentTestimonial(prev =>
                          (prev + 1) % testimonials.length
                        );
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                      }
                    }}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <PiStarFill key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>
<<<<<<< HEAD
                    <p className="text-lg italic mb-6">&quot;{testimonials[currentTestimonial].text}&quot;</p>
=======
                    <p className="text-lg italic mb-6">"{testimonials[currentTestimonial].text}"</p>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
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
<<<<<<< HEAD
                    className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-emerald-700' : 'bg-gray-300'}`}
=======
                    className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-[#4c5f4e]' : 'bg-gray-300'}`}
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="mb-20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">See EkoStudy in Action</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Watch our 2-minute overview to see how EkoStudy is transforming learning for LASUSTECH students.
              </p>

              <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
                <video
                  src="/data/video/lasustech_video.mp4"
                  controls
                  className="w-full h-full object-cover"
                  poster="/upcoming-bg.jpg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
<<<<<<< HEAD
              <h6 className="text-lg font-semibold text-emerald-700 mb-2">Have Questions?</h6>
=======
              <h6 className="text-lg font-semibold text-[#4c5f4e] mb-2">Have Questions?</h6>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4 border-b border-gray-200 pb-4">
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
<<<<<<< HEAD
                    className="flex justify-between items-center w-full text-left font-semibold text-lg py-4 focus:outline-none hover:text-emerald-700 transition-colors"
=======
                    className="flex justify-between items-center w-full text-left font-semibold text-lg py-4 focus:outline-none hover:text-[#4c5f4e] transition-colors"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
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

          {/* Social Media */}
          <section className="mb-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Connect with us on social media for updates, tips, and student success stories.
            </p>
            <div className="flex justify-center space-x-6">
<<<<<<< HEAD
              <a href="#" className="text-2xl text-emerald-700 hover:text-emerald-800 transition-colors">
                <FaXTwitter />
              </a>
              <a href="#" className="text-2xl text-emerald-700 hover:text-emerald-800 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-2xl text-emerald-700 hover:text-emerald-800 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl text-emerald-700 hover:text-emerald-800 transition-colors">
=======
              <a href="#" className="text-2xl text-[#4c5f4e] hover:text-[#3a4a3a] transition-colors">
                <FaXTwitter />
              </a>
              <a href="#" className="text-2xl text-[#4c5f4e] hover:text-[#3a4a3a] transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-2xl text-[#4c5f4e] hover:text-[#3a4a3a] transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl text-[#4c5f4e] hover:text-[#3a4a3a] transition-colors">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                <FaLinkedin />
              </a>
            </div>
          </section>

          {/* Final CTA */}
<<<<<<< HEAD
          <section className="text-center py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-xl text-white">
=======
          <section className="text-center py-16 bg-gradient-to-r from-[#4c5f4e] to-[#3a4a3a] rounded-xl text-white">
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
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
<<<<<<< HEAD
                  className="px-6 py-3 bg-white text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
=======
                  className="btn-primary-white"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                >
                  <span>Get Started for Free</span>
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/features"
<<<<<<< HEAD
                  className="px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-white hover:text-emerald-700 transition-colors"
=======
                  className="btn-secondary-white"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                >
                  <span>Explore Features</span>
                </Link>
                <Link
                  href="/become-tutor"
<<<<<<< HEAD
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
=======
                  className="btn-tertiary-white"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                >
                  <span>Become a Tutor</span>
                </Link>
                <Link
                  href="/colleges"
<<<<<<< HEAD
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
=======
                  className="btn-tertiary-white"
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
                >
                  <span>View Colleges</span>
                </Link>
                <Link
                  href="/contact"
<<<<<<< HEAD
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <span>Contact Us</span>
                </Link>
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <span>Read Our Blog</span>
                </Link>
                <Link
                  href="/products"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <span>Our Products</span>
                </Link>
                <Link
                  href="/partners"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <span>Become a Partner</span>
                </Link>
=======
                  className="btn-tertiary-white"
                >
                  <span>Contact Us</span>
                </Link>
>>>>>>> cc742652c13ef9e42848fb9adee53fbc2eaca096
              </div>
            </motion.div>
          </section>
        </div>

        <Footer />
      </div>
    </ParallaxProvider>
  );
}