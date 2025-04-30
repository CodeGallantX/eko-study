 'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearUser, setUser } from '@/store/slices/userSlice';
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

  const filteredMyGroups = myStudyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscoverGroups = discoverGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateGroup = () => {
    // In a real app, you would send this data to your backend
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
    // In a real app, you would send a request to your backend
    console.log('Joining group:', groupId);
    // Update the group's isMember status
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
      case 'pdf':
        return '📄';
      case 'doc':
        return '📝';
      case 'ppt':
        return '📊';
      default:
        return '📁';
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
        handleSignOut={handleSignOut}
      />
      
      <TopNav
        isDarkMode={isDarkMode}
        isSidebarCollapsed={isSidebarCollapsed}
        username={username}
        notifications={notifications}
      />

      <main className={`${isSidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16 p-6 transition-all duration-300 ease-in-out`}>
        <div className="max-w-7xl mx-auto">
          {/* Header and Create Button */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Study Groups
              </h1>
              <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Collaborate with peers and enhance your learning
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className={`flex items-center px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
              >
                <FiPlus className="mr-2" />
                Create Group
              </button>
            </div>
          </div>

          {/* Search and Tabs */}
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search groups by name or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 w-full py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('my-groups')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'my-groups' ? (isDarkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600') : (isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700')}`}
                >
                  <FaUserFriends className="mr-2" />
                  My Groups
                  <span className="ml-2 bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {myStudyGroups.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'discover' ? (isDarkMode ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600') : (isDarkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700')}`}
                >
                  <FiUsers className="mr-2" />
                  Discover
                </button>
              </nav>
            </div>
          </div>

          {/* Groups List */}
          <div className="space-y-4">
            {activeTab === 'my-groups' && (
              <>
                {filteredMyGroups.length === 0 ? (
                  <div className={`p-8 text-center rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <FiUsers className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <h3 className={`mt-2 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      No groups found
                    </h3>
                    <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {searchQuery ? 'Try a different search term' : 'Join or create a study group to get started'}
                    </p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className={`mt-4 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
                    >
                      Create Your First Group
                    </button>
                  </div>
                ) : (
                  filteredMyGroups.map((group) => (
                    <div 
                      key={group.id}
                      className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div 
                        className="p-4 cursor-pointer"
                        onClick={() => toggleGroupExpand(group.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {group.name}
                              </h3>
                              {group.isAdmin && (
                                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                                  Admin
                                </span>
                              )}
                            </div>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                              {group.subject}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {group.unreadMessages > 0 && (
                              <span className="relative">
                                <FiMessageSquare className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                  {group.unreadMessages}
                                </span>
                              </span>
                            )}
                            <IoMdNotificationsOutline className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            {expandedGroup === group.id ? (
                              <FiChevronUp className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            ) : (
                              <FiChevronDown className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            )}
                          </div>
                        </div>
                        
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2 line-clamp-2`}>
                          {group.description}
                        </p>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiUsers className="mr-2" />
                            <span>{group.members.length}/{group.maxMembers} members</span>
                          </div>
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiCalendar className="mr-2" />
                            <span>Next: {formatMeetingTime(group.nextMeeting)}</span>
                          </div>
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiClock className="mr-2" />
                            <span>Meets {group.meetingFrequency}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Group Details */}
                      {expandedGroup === group.id && (
                        <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Members Section */}
                            <div>
                              <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <BsFillPeopleFill className="inline mr-2" />
                                Members
                              </h4>
                              <div className="space-y-2">
                                {group.members.map(member => (
                                  <div key={member.id} className="flex items-center justify-between">
                                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                      {member.name}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600'}`}>
                                      {member.role}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <button className={`mt-3 w-full px-3 py-1.5 text-sm rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                                Invite Members
                              </button>
                            </div>

                            {/* Study Materials Section */}
                            <div>
                              <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <FiBookOpen className="inline mr-2" />
                                Study Materials
                              </h4>
                              <div className="space-y-2">
                                {group.studyMaterials.map((material, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                      {getFileIcon(material.type)} {material.name}
                                    </span>
                                    <a href={material.link} className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
                                      View
                                    </a>
                                  </div>
                                ))}
                              </div>
                              <button className={`mt-3 w-full px-3 py-1.5 text-sm rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                                Add Material
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 flex space-x-3">
                            <button
                              onClick={() => router.push(`/dashboard/study-groups/${group.id}`)}
                              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors flex-1`}
                            >
                              Open Group
                            </button>
                            <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                              <BsThreeDotsVertical />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </>
            )}

            {activeTab === 'discover' && (
              <>
                {filteredDiscoverGroups.length === 0 ? (
                  <div className={`p-8 text-center rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <FiSearch className={`mx-auto h-12 w-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <h3 className={`mt-2 text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      No groups found
                    </h3>
                    <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {searchQuery ? 'Try a different search term' : 'No groups available to join at this time'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDiscoverGroups.map((group) => (
                      <div 
                        key={group.id}
                        className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {group.name}
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                              {group.subject}
                            </p>
                          </div>
                          <FaChalkboardTeacher className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </div>
                        
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                          {group.description}
                        </p>
                        
                        <div className="mt-4 space-y-2">
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiUsers className="mr-2" />
                            <span>{group.members}/{group.maxMembers} members</span>
                          </div>
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiCalendar className="mr-2" />
                            <span>Next: {formatMeetingTime(group.nextMeeting)}</span>
                          </div>
                          <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <FiBookOpen className="mr-2" />
                            <span>Meets {group.meetingFrequency}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => joinGroup(group.id)}
                            className={`flex-1 px-4 py-2 rounded-lg ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
                          >
                            Join Group
                          </button>
                          <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
                            <BsThreeDotsVertical />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Create New Study Group
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Group Name
                </label>
                <input
                  type="text"
                  value={newGroupForm.name}
                  onChange={(e) => setNewGroupForm({...newGroupForm, name: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g. Advanced Calculus Study Group"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  value={newGroupForm.subject}
                  onChange={(e) => setNewGroupForm({...newGroupForm, subject: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g. Mathematics"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={newGroupForm.description}
                  onChange={(e) => setNewGroupForm({...newGroupForm, description: e.target.value})}
                  className={`w-full px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows={3}
                  placeholder="What will this group focus on?"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Maximum Members
                  </label>
                  <select
                    value={newGroupForm.maxMembers}
                    onChange={(e) => setNewGroupForm({...newGroupForm, maxMembers: parseInt(e.target.value)})}
                    className={`w-full px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    {[5, 10, 15, 20, 25, 30].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Meeting Frequency
                  </label>
                  <select
                    value={newGroupForm.meetingFrequency}
                    onChange={(e) => setNewGroupForm({...newGroupForm, meetingFrequency: e.target.value})}
                    className={`w-full px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}