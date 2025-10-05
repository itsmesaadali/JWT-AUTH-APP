import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	// Get current pathname
	const { pathname } = request.nextUrl;

	// Public routes (no login required)
	const publicRoutes = [
		"/auth/login",
		"/auth/signup",
		"/auth/forgot-password",
		"/auh/reset-password",
		"/auh/verify-email",
		"/" // landing page
	];

	// If user is not logged in and trying to access a protected route
	if (!sessionCookie && !publicRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	// If logged in and trying to access login/signup -> redirect to dashboard
	if (sessionCookie && ["/auth/login", "/auth/signup", "/auth/verify-email"].includes(pathname)) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}

// Middleware will run for all routes except Next.js internals & static assets
export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
