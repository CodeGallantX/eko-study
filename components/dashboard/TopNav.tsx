'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSearch, FiUser } from 'react-icons/fi';

interface TopNavProps {
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
  username: string;
  notifications: Array<{
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
  notifications
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div 
      className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm h-16 fixed top-0 right-0 left-0 z-0 transition-all duration-300 ease-in-out`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className={`relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-deepGreen`}
            />
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <FiBell className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
              <FiUser className="text-xl" />
            </div>
            <div className="hidden md:block">
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                @{username}
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Student
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 