// app/providers/CookieProvider.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CookieProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Persist session to cookies on auth changes
      await fetch('/auth/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          session,
        }),
      })
      
      // Refresh server components
      router.refresh()
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [router, supabase])

  return <>{children}</>
}