"use client";

import Link from "next/link";
import {ModeToggle} from "@/components/theme/ThemeSwitcher";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold text-foreground">
          🚀 MyApp
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Signup
          </Link>
        </nav>

        {/* Theme Switcher */}
        <ModeToggle />
      </div>
    </header>
  );
}
