'use client'

import { createContext, useContext } from 'react'
import { Database } from '@/types/db.supabase'
import { supabase } from '@/lib/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const SupabaseContext = createContext<typeof supabase | null>(null)

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <SupabaseContext.Provider value={supabase}>
        {children}
      </SupabaseContext.Provider>
    </SessionContextProvider>
  )
}

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext)
  if (!ctx) throw new Error('useSupabase must be used within SupabaseProvider')
  return ctx
}