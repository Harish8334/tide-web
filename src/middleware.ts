// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  // Protect student routes
  if (pathname.startsWith('/student') || pathname.startsWith('/(student)')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/(admin)')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    if (userRole && userRole !== 'admin' && userRole !== 'instructor') {
      return NextResponse.redirect(new URL('/student/dashboard', request.url));
    }
  }

  // Redirect away from login/register if already authenticated
  if ((pathname === '/login' || pathname === '/register') && token) {
    if (userRole === 'admin' || userRole === 'instructor') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/student/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/admin/:path*', '/login', '/register'],
};
