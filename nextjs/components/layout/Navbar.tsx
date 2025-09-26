"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-lg font-bold">My App</h1>
      <div>
        {user ? (
          <button onClick={logout} className="px-4 py-2 bg-red-600 rounded">
            Logout
          </button>
        ) : (
          <a href="/login" className="px-4 py-2 bg-blue-600 rounded">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
