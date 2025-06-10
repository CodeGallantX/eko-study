// middleware.ts
import { createClient } from './utils/supabase/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabase = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Example: redirect unauthenticated users trying to access dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Tell Next.js which routes to apply middleware to
export const config = {
  matcher: ['/dashboard/:path*'],
};
