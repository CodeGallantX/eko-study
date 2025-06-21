'use client'

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useSupabase } from './SupabaseProvider'
import { useEffect, useState } from 'react'

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = useSupabase()
  const [session, setSession] = useState(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  )
}