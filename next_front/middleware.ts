// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can check for the existence of an authentication token
const isAuthenticated = (req: NextRequest): boolean => {
    // Replace this with your actual authentication check
    // e.g., check for a specific cookie or a header
    const token = req.cookies.get('accessToken'); 
    return !!token; // Returns true if a token exists
};

// Define the public and protected routes
const publicRoutes = ['/login', '/signup', '/'];
const protectedRoutes = ['/dashboard', '/settings'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userIsAuthenticated = isAuthenticated(request);

    // If the user is on a public route and authenticated, redirect to the dashboard
    if (userIsAuthenticated && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If the user is on a protected route and not authenticated, redirect to the login page
    if (!userIsAuthenticated && protectedRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Continue to the requested page if no redirection is needed
    return NextResponse.next();
}

// Define the paths where the middleware should run
export const config = {
    // The matcher will run the middleware on all routes except API routes, static files, and the internal Next.js routes
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};