// app/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useSupabase } from '@/providers/SupabaseProvider'
import { Loader2, LogOut, BookOpen, Users, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function DashboardPage() {
  const router = useRouter();
  const { firstName } = useSelector((state: RootState) => state.user);
  const [mounted, setMounted] = useState(false);
  const { user, loading, signOut } = useAuth();

  const supabase = useSupabase()

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/auth/signin');
    }
  }, [mounted, loading, user, router]);

  // const handleSignOut = async () => {
  //   await signOut();
  //   router.push('/auth/signin');
  // };

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/signin'
  }

  // Show loading state during initial render or auth check
  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.user_metadata?.name || firstName || 'Student'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here&apos;s what&apos;s happening with your learning
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2"
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
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Email: </span>
                {user?.email}
              </p>
              <p className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Member since: </span>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <CardTitle>Your Courses</CardTitle>
                <CardDescription>Continue your learning journey</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You have 3 active courses. Pick up where you left off.
            </p>
          </CardContent>
        </Card>

        {/* Study Groups Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <CardTitle>Study Groups</CardTitle>
                <CardDescription>Collaborate with peers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join or create study groups to enhance your learning experience.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-400">
            You completed &ldquo;Introduction to React&rdquo; lesson yesterday.
          </p>
        </div>
      </div>
    </div>
  );
}