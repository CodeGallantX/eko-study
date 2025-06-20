'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/db.supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}