"use client";

import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOutAction } from "../../server/users";
import { useState } from "react";

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsPending(true);
      const { success, message } = await signOutAction();

      if (success) {
        toast.success(message as string);
        router.push("/"); 
        router.refresh();
      } else {
        toast.error(message as string);
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <LogOutIcon className="h-4 w-4" />
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
