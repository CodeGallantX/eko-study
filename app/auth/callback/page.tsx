// app/auth/callback/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default async function AuthCallbackPage() {
  const supabase = createServerComponentClient({ cookies })
  
  // Get the session
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    // Check if profile is complete
    const { data: profile } = await supabase
      .from('profiles')
      .select('college, department')
      .eq('id', session.user.id)
      .single()

    if (!profile?.college || !profile?.department) {
      redirect('/auth/complete-profile')
    } else {
      redirect('/dashboard')
    }
  }

  // Fallback UI that will be briefly shown before redirect
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4">Completing authentication...</p>
      </div>
    </div>
  )
}