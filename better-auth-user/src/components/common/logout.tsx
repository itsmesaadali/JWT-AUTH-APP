"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "@/lib/auth-client"; // your auth signOut
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("You have been logged out successfully.");
      router.push("/"); // redirect to home
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </Button>
  );
}
