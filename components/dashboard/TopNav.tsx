'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiSun, FiMoon } from 'react-icons/fi';
import { PiUser } from 'react-icons/pi';

interface TopNavProps {
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
  username: string;
  toggleDarkMode: () => void;
  notifications?: Array<{
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
  }>;
}

export const TopNav: React.FC<TopNavProps> = ({
  isDarkMode,
  isSidebarCollapsed,
  username,
  toggleDarkMode,
  notifications
}) => {
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder during SSR
  if (typeof window === 'undefined') {
    return (
      <div className={`h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}>
        <div className="h-full flex items-center justify-end px-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-deepGreen"></div>
        </div>
      </div>
    );
  }

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <div className={`h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}>
        <div className="h-full flex items-center justify-end px-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-deepGreen"></div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="topnav"
        className={`h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-full flex items-center justify-end px-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <FiBell className="text-xl" />
            </button>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            </button>
            <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                <PiUser className="text-lg" />
              </div>
              <span className="font-medium">@{username}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 