"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;  // ✅ don’t show "no user" while loading

  if (!user) return <p>No user found. Please login.</p>;

  const handleLogout = () => {
    logout(
      () => {
        toast.success("Logout successful!");
        router.push("/");
      },
      (error) => {
        toast.error("Logout failed", {
          description: error.message || "Please try again later",
        });
      }
    );
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.avatar} alt="Avatar" width={100} />
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
