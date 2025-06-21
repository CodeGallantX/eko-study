// components/dashboard/Sidebar.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiHome, FiBook, FiUsers, FiShoppingBag, FiHelpCircle, 
  FiSettings, FiLogOut, FiSun, FiMoon, FiBell 
} from 'react-icons/fi'
import { 
  PiRobot, PiNotebook, PiUser, PiCaretLeft, PiCaretRight 
} from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'

interface SidebarProps {
  isDarkMode: boolean
  isSidebarCollapsed: boolean
  activeSection: string
  toggleDarkMode: () => void
  toggleSidebar: () => void
  setActiveSection: (section: string) => void
  onSignOut: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode,
  isSidebarCollapsed,
  activeSection,
  toggleDarkMode,
  toggleSidebar,
  setActiveSection,
  onSignOut
}) => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const session = useSessionContext()
  const user = useUser()

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigateToSection = (section: string) => {
    setActiveSection(section)
    router.push(`/dashboard/${section}`)
  }

  if (!mounted) {
    return (
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg h-screen fixed left-0 top-0 z-10`}>
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-deepGreen"></div>
        </div>
      </div>
    )
  }

  const firstName = user?.user_metadata?.name || 'Student'
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="sidebar"
        className={`${isMobile ? 'w-16' : isSidebarCollapsed ? 'w-16' : 'w-64'} ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen fixed left-0 top-0 z-10`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className={`p-4 flex items-center justify-between ${isSidebarCollapsed || isMobile ? 'justify-center' : ''}`}>
          {!(isSidebarCollapsed || isMobile) && (
            <Image
              src="/images/yellow-logo.png"
              alt="EkoStudy Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/yellow-logo.png'
              }}
            />
          )}
          <button 
            onClick={toggleSidebar}
            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isSidebarCollapsed || isMobile ? <PiCaretRight /> : <PiCaretLeft/>}
          </button>
        </div>

        {/* User Profile */}
        {!(isSidebarCollapsed || isMobile) && (
          <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center">
              {avatarUrl ? (
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className={`h-10 w-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <PiUser className="text-xl" />
                </div>
              )}
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  @{firstName}
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
            {[
              { section: '', icon: <FiHome className="text-xl" />, label: 'Dashboard' },
              { section: 'courses', icon: <FiBook className="text-xl" />, label: 'Courses' },
              { section: 'study-groups', icon: <FiUsers className="text-xl" />, label: 'Study Groups' },
              { section: 'marketplace', icon: <FiShoppingBag className="text-xl" />, label: 'Marketplace' },
              { section: 'events', icon: <PiNotebook className="text-xl" />, label: 'Events' },
              { section: 'ai-assistant', icon: <PiRobot className="text-xl" />, label: 'AI Assistant' },
              { section: 'notifications', icon: <FiBell className="text-xl" />, label: 'Notifications' },
              { section: 'settings', icon: <FiSettings className="text-xl" />, label: 'Settings' },
            ].map((item) => (
              <li key={item.section}>
                <button 
                  onClick={() => navigateToSection(item.section)}
                  className={`w-full flex items-center p-3 rounded-lg ${activeSection === item.section ? (isDarkMode ? 'bg-gray-700 text-yellow' : 'bg-green-50 text-deepGreen') : (isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
                >
                  {item.icon}
                  {!(isSidebarCollapsed || isMobile) && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
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
                {!(isSidebarCollapsed || isMobile) && <span className="ml-3">Help Center</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={toggleDarkMode}
                className={`w-full flex items-center p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {isDarkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                {!(isSidebarCollapsed || isMobile) && <span className="ml-3">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={onSignOut}
                className={`w-full flex items-center p-3 rounded-lg ${isDarkMode ? 'hover:bg-red-500 text-white' : 'text-red hover:bg-red-50'} transition-colors`}
              >
                <FiLogOut className="text-xl" />
                {!(isSidebarCollapsed || isMobile) && <span className="ml-3">Sign Out</span>}
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}