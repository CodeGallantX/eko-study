'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearUser, setUser } from '@/store/slices/userSlice';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { FiCalendar, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function AssignmentsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('assignments');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  // Mock assignments data
  const assignments = [
    {
      id: 1,
      title: 'Computer Science Project',
      course: 'Introduction to Programming',
      dueDate: '2024-04-15',
      status: 'pending',
      description: 'Create a simple web application using HTML, CSS, and JavaScript.',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics 101',
      dueDate: '2024-04-10',
      status: 'completed',
      description: 'Write a lab report on the experiment conducted in class.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Mathematics Assignment',
      course: 'Calculus I',
      dueDate: '2024-04-20',
      status: 'pending',
      description: 'Solve problems from chapters 5 and 6.',
      priority: 'low'
    }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Assignment',
      message: 'New assignment added to Computer Science',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Assignment Due Soon',
      message: 'Physics Lab Report is due in 2 days',
      time: '1 day ago',
      read: true
    }
  ];

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData && !isAuthenticated) {
          router.push('/auth/signin');
        } else if (userData && !isAuthenticated) {
          const parsedUserData = JSON.parse(userData);
          dispatch(setUser({
            isAuthenticated: true,
            firstName: parsedUserData.firstName || '',
            lastName: parsedUserData.lastName || '',
            email: parsedUserData.email || '',
            username: parsedUserData.username || ''
          }));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [isAuthenticated, router, dispatch]);

  const handleSignOut = () => {
    dispatch(clearUser());
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    router.push('/auth/signin');
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deepGreen"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        activeSection={activeSection}
        username={username}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        setActiveSection={setActiveSection}
        onSignOut={handleSignOut} // Changed from handleSignOut to onSignOut
      />
      
      <TopNav
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isSidebarCollapsed={isSidebarCollapsed}
        username={username}
        notifications={notifications}
      />

      <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Assignments
            </h1>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-deepGreen`}
              >
                <option value="all">All Assignments</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div 
                key={assignment.id}
                className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {assignment.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {assignment.course}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 ${getPriorityColor(assignment.priority)}`}>
                    {assignment.status === 'completed' ? (
                      <FiCheckCircle className="h-5 w-5" />
                    ) : (
                      <FiAlertCircle className="h-5 w-5" />
                    )}
                  </div>
                </div>
                
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                  {assignment.description}
                </p>
                
                <div className="mt-4 flex items-center space-x-4">
                  <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FiCalendar className="mr-1" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FiClock className="mr-1" />
                    <span>{assignment.status === 'completed' ? 'Completed' : 'Pending'}</span>
                  </div>
                </div>
                
                {assignment.status === 'pending' && (
                  <div className="mt-4">
                    <button className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green hover:bg-deepGreen'} text-white transition-colors`}>
                      Mark as Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}