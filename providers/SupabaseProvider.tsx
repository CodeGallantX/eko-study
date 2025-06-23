// app/providers/SupabaseProvider.tsx
'use client'

import { createContext, useContext } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Database } from '@/types/db.supabase'

const SupabaseContext = createContext<ReturnType<typeof createClientComponentClient<Database>> | null>(null)

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient<Database>()

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