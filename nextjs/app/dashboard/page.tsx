"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not authorized</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
