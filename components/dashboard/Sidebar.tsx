'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiBook, FiUsers, FiShoppingBag, FiHelpCircle, 
  FiSettings, FiLogOut, FiSun, FiMoon, FiBell
} from 'react-icons/fi';
import { 
  PiRobot, PiNotebook, PiUser
} from 'react-icons/pi';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
  activeSection: string;
  username: string;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setActiveSection: (section: string) => void;
  // handleSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode,
  isSidebarCollapsed,
  activeSection,
  username,
  toggleDarkMode,
  toggleSidebar,
  setActiveSection,
  // handleSignOut
}) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigateToSection = (section: string) => {
    setActiveSection(section);
    router.push(`/dashboard/${section}`);
  };

  // Return a placeholder during SSR
  if (typeof window === 'undefined') {
    return (
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg h-screen fixed left-0 top-0 z-10`}>
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-deepGreen"></div>
        </div>
      </div>
    );
  }

  // Show loading state until component is mounted
  if (!mounted) {
    return (
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg h-screen fixed left-0 top-0 z-10`}>
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-deepGreen"></div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="sidebar"
        className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen fixed left-0 top-0 z-10`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className={`p-4 flex items-center justify-between ${isSidebarCollapsed ? 'justify-center' : ''}`}>
          {!isSidebarCollapsed && (
            <h1 className="text-xl font-bold text-deepGreen">EkoStudy</h1>
          )}
          <button 
            onClick={toggleSidebar}
            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* User Profile */}
        {!isSidebarCollapsed && (
          <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                <PiUser className="text-xl" />
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  @{username}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Student
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <button 
                onClick={() => navigateToSection('')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === '' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-gray-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiHome className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('courses')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'courses' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiBook className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Courses</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('study-groups')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'study-groups' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiUsers className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Study Groups</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('marketplace')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'marketplace' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiShoppingBag className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Marketplace</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('tutorials')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'tutorials' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <PiNotebook className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Tutorials</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('ai-assistant')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'ai-assistant' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <PiRobot className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">AI Assistant</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('notifications')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'notifications' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiBell className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Notifications</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateToSection('settings')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'settings' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiSettings className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Settings</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Secondary Menu */}
        <div className="p-4 border-t border-gray-400">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => navigateToSection('help')}
                className={`w-full flex items-center p-3 rounded-lg ${activeSection === 'help' ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
              >
                <FiHelpCircle className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Help Center</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={toggleDarkMode}
                className={`w-full flex items-center p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                {!isSidebarCollapsed && <span className="ml-3">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              </button>
            </li>
            <li>
              <button 
                // onClick={handleSignOut}
                className="w-full flex items-center p-3 rounded-lg text-red hover:bg-red-50"
              >
                <FiLogOut className="text-xl" />
                {!isSidebarCollapsed && <span className="ml-3">Sign Out</span>}
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 