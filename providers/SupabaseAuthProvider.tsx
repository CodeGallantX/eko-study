// app/providers/SupabaseAuthProvider.tsx
'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useSupabase } from './SupabaseProvider'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = useSupabase()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    let mounted = true
    let subscription: any

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (mounted) setSession(session)
    }

    getSession()

    subscription = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setSession(session)
    }).data.subscription

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}