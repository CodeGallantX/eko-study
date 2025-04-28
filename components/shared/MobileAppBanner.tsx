"use client";

import { motion } from "framer-motion";
import { FaMobileAlt, FaApple, FaGooglePlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function MobileAppBanner() {
  return (
    <section className="relative w-full py-12 bg-gradient-to-r from-[#4c5f4e] to-[#3a4a3b] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <motion.div 
            className="text-center md:text-left max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center mb-4 px-4 py-2 bg-white/10 rounded-full">
              <FaMobileAlt className="text-yellow-400 mr-2" />
              <span className="text-white font-medium">MOBILE APP</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-yellow-400">EkoStudy</span> Mobile App Coming Soon!
            </h2>
            
            <p className="text-lg text-gray-200 mb-6">
              Get ready to take your studies anywhere! Download our app for exclusive features, 
              offline access, and personalized learning on the go.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button 
                className="flex items-center justify-center px-6 py-3 bg-black rounded-lg text-white hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaApple className="text-2xl mr-3" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </motion.button>
              
              <motion.button 
                className="flex items-center justify-center px-6 py-3 bg-black rounded-lg text-white hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGooglePlay className="text-xl mr-3" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-64 h-auto">
              <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-xl"></div>
              <img 
                src="/images/phone-mockup.png" 
                alt="EkoStudy Mobile App" 
                className="relative z-10 w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Early Access Form */}
        <motion.div 
          className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Get Early Access</h3>
              <p className="text-gray-200">Be the first to know when we launch! Enter your email below.</p>
            </div>
            
            <div className="flex-1 w-full">
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-yellow-400 text-[#4c5f4e] font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}