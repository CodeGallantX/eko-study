import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  // Parse cookies from request header
  const cookieHeader = request.headers.get('cookie') || ''
  const cookieMap = new Map(
    cookieHeader.split('; ').map((c) => {
      const [key, ...v] = c.split('=')
      return [key.trim(), v.join('=')]
    })
  )

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieMap.get(key),
        set: () => {},
        remove: () => {},
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
