"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  return (
    <nav className="w-full py-5 flex items-center justify-between ">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-lg font-medium">
          <h1 className="text-2xl font-bold">
            Next<span className="text-primary">Learn</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2 ">
          <Link
            href="/"
            className={`${buttonVariants({
              size: "lg",
              variant: "ghost",
            })} text-xl`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={buttonVariants({ size: "lg", variant: "ghost" })}
          >
            Blog
          </Link>
          <Link
            href="/create"
            className={buttonVariants({ size: "lg", variant: "ghost" })}
          >
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button
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
              className={buttonVariants({ size: "lg" })}
              href="/auth/signup"
            >
              Sign up
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary", size: "lg" })}
              href="/auth/login"
            >
              Log in
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
