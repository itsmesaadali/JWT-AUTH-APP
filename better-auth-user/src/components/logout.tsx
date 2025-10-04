"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "../lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      toast("Logged Out", {
        description: "You have been logged out successfully.",
      });
      router.push("/");
    } catch (error) {
        toast("Logout Failed", {
        description: "Something went wrong. Please try again.",
      });
    }
   
  };

  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </Button>
  );
}
