import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => {
          const cookieHeader = request.headers.get('cookie') || ''
          const cookies = Object.fromEntries(
            cookieHeader.split('; ').map((cookie) => {
              const [key, ...value] = cookie.split('=')
              return [key.trim(), value.join('=')]
            })
          )
          return cookies[name]
        },
        set() {},
        remove() {},
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Session set',
    user: {
      id: session.user.id,
      email: session.user.email,
    },
  })
}
