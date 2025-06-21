'use client'

import { createContext, useContext } from 'react'
import { type SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/db.supabase'

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null)

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

export default SupabaseContext