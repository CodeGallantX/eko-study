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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [router, supabase])

  return <>{children}</>
}