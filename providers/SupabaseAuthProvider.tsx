'use client'

import { Session } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useEffect } from 'react'

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession: Session | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase, serverSession?.access_token])

  return children
}