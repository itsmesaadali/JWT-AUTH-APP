import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;

  const protectedRoutes = ['/profile'];
  const authRoutes = ['/login'];

  if (protectedRoutes.includes(pathname)) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (authRoutes.includes(pathname)) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login'],
};