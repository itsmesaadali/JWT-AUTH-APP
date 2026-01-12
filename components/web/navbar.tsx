"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SearchInput } from "./SearchInput";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight">
                Next<span className="text-primary">Blog</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "/", label: "Home" },
                { href: "/blog", label: "Blog" },
                { href: "/create", label: "Create" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-sm font-medium text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block mr-2">
              <SearchInput />
            </div>

            {isLoading ? null : isAuthenticated ? (
              <Button
                size="lg"
                variant="default"
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("Logged out successfully");
                        router.push("/");
                      },
                      onError: (error) => {
                        toast.error(error.error.message || "Error logging out");
                      },
                    },
                  })
                }
              >
                Logout
              </Button>
            ) : (
              <>
                <Link
                  className={buttonVariants({ size: "sm" })}
                  href="/auth/signup"
                >
                  Sign up
                </Link>
                <Link
                  className={buttonVariants({ variant: "secondary", size: "sm" })}
                  href="/auth/login"
                >
                  Log in
                </Link>
              </>
            )}

            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
