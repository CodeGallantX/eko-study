import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function POST(request: Request) {
  const cookieStore = await cookies() // Await this line to fix the error

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({
                name,
                value,
                ...options,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 1 week
              })
            } catch (err) {
              console.warn(`Failed to set cookie "${name}":`, err)
            }
          },
          remove(name: string) {
            try {
              cookieStore.delete(name)
            } catch (err) {
              console.warn(`Failed to remove cookie "${name}":`, err)
            }
          },
        },
      }
    )

    const { session } = await request.json()

    if (session) {
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting auth cookies:', error)
    return NextResponse.json(
      { error: 'Failed to set authentication cookies' },
      { status: 500 }
    )
  }
}
