// providers/SupabaseProvider.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/db.supabase'
import { createContext, useContext, useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'

type SupabaseContextType = {
  supabase: ReturnType<typeof createClientComponentClient<Database>>
  session: Session | null
}

const Context = createContext<SupabaseContextType | null>(null)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient<Database>()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}