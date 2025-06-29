'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/redux/store'
import { clearUserData, setUserData } from '@/lib/redux/features/userSlice'
import { supabase } from '@/lib/supabase'
import type { AuthChangeEvent, Session, User } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      dispatch(clearUserData())

      await fetch('/auth/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session: null }),
        credentials: 'include',
      })

      router.push('/auth/signin')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }, [dispatch, router])

  const fetchUser = useCallback(async () => {
    setLoading(true)
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) throw error

      if (user) {
        setUser(user)

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError

        dispatch(
          setUserData({
            id: user.id,
            email: user.email || '',
            firstName: profile?.first_name || '',
            lastName: profile?.last_name || '',
            fullName: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
            profile: {
              college: profile?.college || '',
              department: profile?.department || '',
              avatarUrl: profile?.avatar_url || '',
            },
          })
        )
      } else {
        setUser(null)
        dispatch(clearUserData())
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      dispatch(clearUserData())
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  useEffect(() => {
    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (
          event === 'SIGNED_IN' ||
          event === 'USER_UPDATED' ||
          event === 'TOKEN_REFRESHED'
        ) {
          fetchUser()
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          dispatch(clearUserData())
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [fetchUser, dispatch])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signOut: handleSignOut,
    refreshUser: fetchUser,
  }
}
