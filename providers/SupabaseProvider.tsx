// app/providers/SupabaseProvider.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/db.supabase'
import { createContext, useContext } from 'react'

const Context = createContext(createClientComponentClient<Database>())

// Make sure you're using default export
export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClientComponentClient<Database>()
  return <Context.Provider value={supabase}>{children}</Context.Provider>
}

export const useSupabase = () => useContext(Context)