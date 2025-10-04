import Link from "next/link";
import { ModeToggle } from "@/components/theme/ThemeSwitcher";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Navbar() {
  const result = await auth.api.getSession({ headers: await headers() });
  const user = result?.user;

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

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </>
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
          {/* Theme Switcher */}
          <ModeToggle />

          {/* Profile Picture or Avatar */}
          {user && (
            <Link href="/profile">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="User profile"
                  width={36}
                  height={36}
                  className="rounded-full border"
                />
              ) : (
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-muted text-foreground font-medium">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}