'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearUserData, setUserData } from '@/store/slices/userSlice';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopNav } from '@/components/dashboard/TopNav';
import { FiUsers, FiCalendar, FiClock, FiPlus, FiSearch, FiMessageSquare, FiBookOpen, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUserFriends } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsThreeDotsVertical, BsFillPeopleFill } from 'react-icons/bs';

export default function StudyGroupsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, isAuthenticated } = useSelector((state: RootState) => state.user);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('study-groups');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('my-groups');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [newGroupForm, setNewGroupForm] = useState({
    name: '',
    subject: '',
    description: '',
    maxMembers: 10,
    meetingFrequency: 'weekly'
  });

  // Mock study groups data
  const myStudyGroups = [
    {
      id: 1,
      name: 'Advanced Calculus Study Group',
      subject: 'Mathematics',
      description: 'Focusing on multivariable calculus and differential equations. We meet weekly to solve problems and discuss concepts.',
      members: [
        { id: 1, name: 'Alex Johnson', role: 'Admin' },
        { id: 2, name: 'Sam Wilson', role: 'Member' },
        { id: 3, name: 'Taylor Smith', role: 'Member' }
      ],
      maxMembers: 12,
      nextMeeting: '2024-04-15T18:00:00',
      meetingFrequency: 'weekly',
      isAdmin: true,
      unreadMessages: 3,
      recentActivity: '2 hours ago',
      studyMaterials: [
        { name: 'Calculus Textbook', link: '#', type: 'pdf' },
        { name: 'Problem Set 4', link: '#', type: 'doc' }
      ]
    },
    {
      id: 2,
      name: 'Computer Science Study Group',
      subject: 'Computer Science',
      description: 'Data structures and algorithms study sessions with coding practice and interview preparation.',
      members: [
        { id: 1, name: 'Jordan Lee', role: 'Admin' },
        { id: 2, name: username || 'You', role: 'Member' },
        { id: 3, name: 'Casey Kim', role: 'Member' }
      ],
      maxMembers: 10,
      nextMeeting: '2024-04-12T16:30:00',
      meetingFrequency: 'bi-weekly',
      isAdmin: false,
      unreadMessages: 0,
      recentActivity: '1 day ago',
      studyMaterials: [
        { name: 'Algorithms Book', link: '#', type: 'pdf' },
        { name: 'Week 3 Slides', link: '#', type: 'ppt' }
      ]
    }
  ];

  const discoverGroups = [
    {
      id: 3,
      name: 'Physics Study Group',
      subject: 'Physics',
      description: 'Quantum mechanics and thermodynamics study group with weekly problem-solving sessions.',
      members: 6,
      maxMembers: 15,
      nextMeeting: '2024-04-14T17:00:00',
      meetingFrequency: 'weekly',
      isMember: false
    },
    {
      id: 4,
      name: 'Literature Circle',
      subject: 'English',
      description: 'Discussion group for classic and contemporary literature with monthly book readings.',
      members: 9,
      maxMembers: 12,
      nextMeeting: '2024-04-16T19:00:00',
      meetingFrequency: 'monthly',
      isMember: false
    },
    {
      id: 5,
      name: 'Biology Study Group',
      subject: 'Biology',
      description: 'Molecular biology and genetics study sessions with lab report collaboration.',
      members: 4,
      maxMembers: 8,
      nextMeeting: '2024-04-13T15:00:00',
      meetingFrequency: 'weekly',
      isMember: false
    }
  ];

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Group Invitation',
      message: 'You have been invited to join the Biology Study Group',
      time: '3 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      message: 'Computer Science Study Group meeting starts in 1 hour',
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
          dispatch(setUserData({
            fullName: parsedUserData.fullName || '',
            email: parsedUserData.email || '',
            username: parsedUserData.username || '',
            isAuthenticated: true
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
    dispatch(clearUserData());
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    router.push('/auth/signin');
  };

  const filteredMyGroups = myStudyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscoverGroups = discoverGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = () => {
    console.log('Creating new group:', newGroupForm);
    setShowCreateModal(false);
    setNewGroupForm({
      name: '',
      subject: '',
      description: '',
      maxMembers: 10,
      meetingFrequency: 'weekly'
    });
  };

  const joinGroup = (groupId: number) => {
    console.log('Joining group:', groupId);
  };

  const formatMeetingTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleGroupExpand = (groupId: number) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'ppt': return '📊';
      default: return '📁';
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
        onSignOut={handleSignOut}
      />
      
      <TopNav
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        username={username}
        notifications={notifications}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
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