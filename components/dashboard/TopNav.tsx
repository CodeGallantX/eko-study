'use client';

import { useState, useEffect } from 'react';
import { FiBell, FiSun, FiMoon, FiSearch } from 'react-icons/fi';
import { PiUser } from 'react-icons/pi';
import { useSupabase } from '@/providers/SupabaseProvider';
import Image from 'next/image';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface TopNavProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  notifications: Notification[];
}

export const TopNav: React.FC<TopNavProps> = ({
  isDarkMode,
  toggleDarkMode,
  isSidebarCollapsed,
  notifications,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { session } = useSupabase();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const firstName = user?.user_metadata?.name || 'Student';
  const avatarUrl = user?.user_metadata?.avatar_url;

  if (!mounted) {
    return (
      <div className={`h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}>
        <div className="h-full flex items-center justify-end px-4">
          <div className="flex items-center space-x-4">
            <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
              <PiUser className="text-lg" />
            </div>
            <span className="font-medium">@{firstName}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm fixed top-0 right-0 z-10 ${isSidebarCollapsed ? 'left-16' : 'left-64'} transition-all duration-300`}
    >
      <div className="h-full flex items-center justify-between px-4">
        <div className="w-full max-w-lg px-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'} rounded-lg focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-yellow' : 'focus:ring-green'}`}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
            >
              <FiBell className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 z-50`}>
                <div className="p-2">
                  <h3 className={`px-3 py-2 font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h3>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-3 py-2 rounded ${!notification.read ? (isDarkMode ? 'bg-gray-700' : 'bg-blue-50') : ''} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {notification.title}
                            </h4>
                            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {notification.time}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className={`px-3 py-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No notifications
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isDarkMode ? <FiSun className="text-white text-xl" /> : <FiMoon className="text-xl" />}
          </button>

          <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {avatarUrl ? (
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={avatarUrl}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                <PiUser className="text-lg" />
              </div>
            )}
            <span className="font-medium">@{firstName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};