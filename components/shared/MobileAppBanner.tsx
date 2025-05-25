"use client";

import Image from 'next/image';
import { FaMobileAlt, FaGooglePlay } from "react-icons/fa";

export default function MobileAppBanner() {
  return (
    <section 
      aria-labelledby="mobile-app-heading"
      className="relative w-full py-12 bg-gradient-to-r from-[#4c5f4e] to-[#3a4a3b] overflow-hidden"
    >
      {/* Background Pattern - Using CSS instead of image for better performance */}
      <div 
        className="absolute inset-0 opacity-10 bg-grid-pattern"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <div 
              className="inline-flex items-center mb-4 px-4 py-2 bg-white/10 rounded-full"
              aria-label="Mobile App"
            >
              <FaMobileAlt className="text-yellow-400 mr-2" aria-hidden="true" />
              <span className="text-white font-medium">MOBILE APP</span>
            </div>
            
            <h2 id="mobile-app-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-yellow-400">EkoStudy</span> Mobile App Coming Soon!
            </h2>
            
            <p className="text-lg text-gray-200 mb-6">
              Get ready to take your studies anywhere! Download our app for exclusive features, 
              offline access, and personalized learning on the go.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                className="flex items-center justify-center px-6 py-3 bg-black rounded-lg text-white hover:bg-gray-800 transition-colors"
                aria-label="Get on Google Play"
              >
                <FaGooglePlay className="text-2xl mr-3" aria-hidden="true" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Phone Mockup - Using priority loading for above-the-fold image */}
          <div className="relative">
            <div className="relative w-64 h-auto">
              <div 
                className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-xl"
                aria-hidden="true"
              />
              <Image
                src="/images/phone-mockup.png"
                alt="EkoStudy Mobile App Preview"
                width={256}
                height={512}
                className="relative z-10 w-full h-auto"
                priority // Preload important image
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Early Access Form */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto">
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
                  aria-label="Email for early access"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-yellow-400 text-[#4c5f4e] font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                  aria-label="Notify me when app launches"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}