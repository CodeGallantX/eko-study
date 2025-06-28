import { cookies as getCookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST() {
  const maybePromise = getCookies()
  const cookieStore = maybePromise instanceof Promise ? await maybePromise : maybePromise

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},     // no-op
        remove() {},  // no-op
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    message: 'Session set',
    user: {
      id: session.user.id,
      email: session.user.email,
    },
  })
}
