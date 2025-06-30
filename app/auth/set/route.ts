import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies as getCookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await getCookies() // ✅ Await is REQUIRED here
    const response = new NextResponse()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set(name, value, {
              ...options,
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              domain:
                process.env.NODE_ENV === 'production'
                  ? '.eko-study.vercel.app'
                  : undefined,
            })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set(name, '', {
              ...options,
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 0,
              domain:
                process.env.NODE_ENV === 'production'
                  ? '.eko-study.vercel.app'
                  : undefined,
            })
          },
        },
      }
    )

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    console.log('Session check:', {
      hasSession: !!session,
      sessionError,
      userId: session?.user?.id,
    })

    if (session) {
      return NextResponse.json(
        {
          success: true,
          message: 'Session verified',
          user: {
            id: session.user.id,
            email: session.user.email,
          },
        },
        {
          status: 200,
          headers: response.headers,
        }
      )
    }

    const refreshToken = cookieStore.get('sb-refresh-token')?.value

    if (!refreshToken) {
      console.log('No session and no refresh token available')
      return NextResponse.json(
        {
          error: 'Not authenticated',
          message: 'No active session found',
          needsAuth: true,
        },
        { status: 401 }
      )
    }

    console.log('Attempting to refresh session...')
    const {
      data: { session: refreshedSession },
      error: refreshError,
    } = await supabase.auth.refreshSession()

    if (refreshError || !refreshedSession) {
      console.log('Session refresh failed:', refreshError)

      response.cookies.delete('sb-access-token')
      response.cookies.delete('sb-refresh-token')

      return NextResponse.json(
        {
          error: 'Authentication failed',
          message: 'Session could not be refreshed',
          needsAuth: true,
        },
        {
          status: 401,
          headers: response.headers,
        }
      )
    }

    console.log('Session refreshed successfully')
    return NextResponse.json(
      {
        success: true,
        message: 'Session refreshed',
        user: {
          id: refreshedSession.user.id,
          email: refreshedSession.user.email,
        },
      },
      {
        status: 200,
        headers: response.headers,
      }
    )
  } catch (error) {
    console.error('Auth set error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
