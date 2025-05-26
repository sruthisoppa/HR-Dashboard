// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedPaths = ['/hr-dashboard'];

  // Check if the route is protected
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const cookieHeader = request.cookies.get('authToken');

    if (!cookieHeader || cookieHeader !== 'abc123') {
      // Not authenticated, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}