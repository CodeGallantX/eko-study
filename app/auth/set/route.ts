import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  try {
    // Parse cookies with better error handling
    const cookieHeader = request.headers.get('cookie') || ''
    const cookieMap = new Map()

    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookie) => {
        const [key, ...valueParts] = cookie.trim().split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=')
          cookieMap.set(key.trim(), decodeURIComponent(value))
        }
      })
    }

    // Create response to handle cookie setting
    const response = new NextResponse()

    // Create Supabase server client with proper cookie handling
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (key) => {
            return cookieMap.get(key)
          },
          set: (key, value, options) => {
            cookieMap.set(key, value)
            response.cookies.set(key, value, {
              ...options,
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
            })
          },
          remove: (key, options) => {
            cookieMap.delete(key)
            response.cookies.set(key, '', {
              ...options,
              httpOnly: false,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              path: '/',
              maxAge: 0,
            })
          },
        },
      }
    )

    // Get current session
    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession()

    // If no session, try to refresh or handle the case gracefully
    if (!session) {
      // Try to refresh the session
      const {
        data: { session: refreshedSession },
        error: refreshError
      } = await supabase.auth.refreshSession()

      if (!refreshedSession) {
        console.log('No session found:', { sessionError, refreshError })
        return NextResponse.json(
          { 
            error: 'Not authenticated',
            details: 'No valid session found',
            needsAuth: true
          }, 
          { status: 401 }
        )
      }

      // Use the refreshed session
      return NextResponse.json({
        message: 'Session refreshed and set',
        user: {
          id: refreshedSession.user.id,
          email: refreshedSession.user.email,
        },
      }, { status: 200, headers: response.headers })
    }

    // Return success with session data
    return NextResponse.json({
      message: 'Session verified',
      user: {
        id: session.user.id,
        email: session.user.email,
      },
    }, { status: 200, headers: response.headers })

  } catch (error) {
    console.error('Auth set error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
