'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearUserData, setUserData } from '@/lib/redux/features/userSlice';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import CourseCard from '@/components/CourseCard';

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  progress: number;
  rating: number;
  students: number;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function CoursesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');
  const [isLoading, setIsLoading] = useState(true);

  // Mock courses data
  const courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Computer Science',
      instructor: 'Dr. John Smith',
      image: '/images/courses/cs101.jpg',
      progress: 65,
      rating: 4.8,
      students: 1250,
    },
    {
      id: 2,
      title: 'Advanced Mathematics',
      instructor: 'Prof. Sarah Johnson',
      image: '/images/courses/math201.jpg',
      progress: 30,
      rating: 4.6,
      students: 980,
    },
    {
      id: 3,
      title: 'Physics Fundamentals',
      instructor: 'Dr. Michael Brown',
      image: '/images/courses/physics101.jpg',
      progress: 0,
      rating: 4.7,
      students: 1100,
    },
    {
      id: 4,
      title: 'Chemistry Basics',
      instructor: 'Prof. Emily Davis',
      image: '/images/courses/chem101.jpg',
      progress: 0,
      rating: 4.5,
      students: 850,
    },
  ];

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: 1,
      title: 'New Course Available',
      message: 'Introduction to Computer Science is now available',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Study Group Invitation',
      message: 'You have been invited to join the Physics study group',
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
          return;
        }

        if (userData && !isAuthenticated) {
          const parsedUserData = JSON.parse(userData);
          const userPayload = {
            isAuthenticated: true,
            _id: parsedUserData._id || '',
            fullName: parsedUserData.fullName || `${parsedUserData.firstName || ''} ${parsedUserData.lastName || ''}`.trim(),
            email: parsedUserData.email || '',
            username: parsedUserData.username || '',
            token: parsedUserData.token || ''
          };
          
          dispatch(setUserData(userPayload));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoading(false);
        router.push('/auth/signin');
      }
    };
    
    checkAuth();
  }, [isAuthenticated, router, dispatch]);

  const handleSignOut = () => {
    dispatch(clearUserData());
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    router.push('/auth/signin');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        setActiveSection={setActiveSection}
        onSignOut={handleSignOut}
      />
      
      <TopNav
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        username={username}
        notifications={notifications}
        toggleDarkMode={toggleDarkMode}
      />

      <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Courses
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard 
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                image={course.image}
                progress={course.progress}
                rating={course.rating}
                students={course.students}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}