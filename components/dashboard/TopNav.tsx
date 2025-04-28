'use client';

import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiSun, FiMoon } from 'react-icons/fi';
import { PiUser } from 'react-icons/pi';

interface TopNavProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  username: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  isDarkMode,
  toggleDarkMode,
  isSidebarCollapsed,
  username,
}) => {
  // const [showNotifications, setShowNotifications] = useState(false);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return (
  //     <div className={`h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}>
  //       <div className="h-full flex items-center justify-end px-4">
  //         <div className="flex items-center space-x-4">
  //           <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
  //             <PiUser className="text-lg" />
  //           </div>
  //           <span className="font-medium">@{username}</span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  //   }
    

  return (
    <div 
      className={`h-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}
    >
      <div className="h-full flex items-center justify-between px-4">
        <fieldset className="w-full max-w-lg px-2">
          <input 
            type="search"
            className={`w-full pl-2 pr-8 py-1 md:py-2 border border-gray-400 focus:border-none focus:ring-1 outline-none transition-all duration-300 ease-in-out rounded ${isDarkMode ? "bg-gray-700/50 focus:ring-yellow text-gray-400" : "bg-none focus:ring-green text-gray-800" }`}
          />
        </fieldset>
        <div className="flex items-center space-x-4">
          <button 
            // onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <FiBell className={`text-xl ${isDarkMode ? 'text-white' : 'text-black' }`} />
          </button>
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isDarkMode ? <FiSun className="text-white text-xl" /> : <FiMoon className="text-xl" />}
          </button>
          <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
              <PiUser className="text-lg" />
            </div>
            <span className="font-medium">@{username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 
