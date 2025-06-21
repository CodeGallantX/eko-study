// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, LogOut, BookOpen, Users, User, Notebook, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useSupabase } from '@/providers/SupabaseProvider'

export default function DashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const { supabase, session } = useSupabase()
  const user = session?.user

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !session) {
      router.push('/auth/signin')
    }
  }, [mounted, session, router])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/auth/signin')
    }
  }

  if (!mounted || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-gray-900 dark:text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Student'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your learning
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-700">
                <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <CardTitle className="dark:text-white">Your Profile</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage your account information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-400">Email: </span>
                {user?.email}
              </p>
              <p className="text-sm dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-400">Member since: </span>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <CardTitle className="dark:text-white">Your Courses</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Continue your learning journey
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You have 3 active courses. Pick up where you left off.
            </p>
            <Button variant="link" className="mt-2 p-0 text-blue-600 dark:text-blue-400">
              View courses
            </Button>
          </CardContent>
        </Card>

        {/* Study Groups Card */}
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <CardTitle className="dark:text-white">Study Groups</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Collaborate with peers
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join or create study groups to enhance your learning experience.
            </p>
            <Button variant="link" className="mt-2 p-0 text-blue-600 dark:text-blue-400">
              Browse groups
            </Button>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Notebook className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <CardTitle className="dark:text-white">Your Notes</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Review and organize your notes
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You have 12 saved notes across your courses.
            </p>
            <Button variant="link" className="mt-2 p-0 text-blue-600 dark:text-blue-400">
              View notes
            </Button>
          </CardContent>
        </Card>

        {/* AI Assistant Card */}
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-full">
                <Bot className="h-6 w-6 text-pink-600 dark:text-pink-300" />
              </div>
              <div>
                <CardTitle className="dark:text-white">AI Assistant</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Get help with your studies
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ask questions and get instant answers from our AI tutor.
            </p>
            <Button variant="link" className="mt-2 p-0 text-blue-600 dark:text-blue-400">
              Try it now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 dark:border dark:border-gray-700">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                <BookOpen className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Completed lesson: Introduction to React
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full mt-1">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  Joined study group: Advanced JavaScript
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}