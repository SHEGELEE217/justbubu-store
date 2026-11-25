// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user has our auth cookie
  const isAuthenticated = request.cookies.has('justbubu_admin_token');

  // If they are trying to access the admin area and are not logged in
  if (request.nextUrl.pathname.startsWith('/admin') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If they are logged in and try to go to the login page, send them to admin
  if (request.nextUrl.pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Tell middleware to only run on these paths
export const config = {
  matcher: ['/admin/:path*', '/login'],
};