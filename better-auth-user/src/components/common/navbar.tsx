"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/lib/auth-client"; // assuming your auth client exposes this
import { LogoutButton } from "@/components/common/logout";

export default function Navbar() {
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-foreground">
          🚀 MyApp
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>

          {session ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Loading state (optional) */}
          {isPending && (
            <div className="w-9 h-9 animate-pulse rounded-full bg-muted"></div>
          )}

          {/* Profile Picture / Avatar + Logout */}
          {session?.user && (
            <>
              <Link href="/profile">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="User profile"
                    width={36}
                    height={36}
                    className="rounded-full border"
                  />
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-muted text-foreground font-medium">
                    {session.user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}
              </Link>

              {/* Logout button */}
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
