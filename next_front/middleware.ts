import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const isAuth = request.cookies.has("accessToken"); // ✅ now cookie will exist

  // Protect /dashboard
  if (url.pathname.startsWith("/dashboard") && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect if logged in
  if ((url.pathname === "/login" || url.pathname === "/") && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};
