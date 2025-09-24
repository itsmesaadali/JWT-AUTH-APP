"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth.api";
import type { LoginCredentials, RegisterData, User } from "@/lib/types/auth.types";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (userData: RegisterData) => Promise<User>;
  googleLogin: (token: string) => Promise<User>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Initialize user on mount
  useEffect(() => {
    const initUser = async () => {
      try {
        const user = await authApi.getCurrentUser();
        queryClient.setQueryData(["currentUser"], user);
      } catch {
        queryClient.setQueryData(["currentUser"], null);
      }
    };
    initUser();
  }, [queryClient]);

  const setUser = (user: User | null) => {
    queryClient.setQueryData(["currentUser"], user);
  };

  const handleAuthSuccess = async (user: User) => {
    setUser(user);
    router.push("/dashboard");
  };

  const login = async (credentials: LoginCredentials) => {
    const data = await authApi.login(credentials);
    if (!data?.user) throw new Error("Invalid login response");
    await handleAuthSuccess(data.user);
    return data.user;
  };

  const register = async (userData: RegisterData) => {
    const data = await authApi.register(userData);
    if (!data?.user) throw new Error("Invalid register response");
    await handleAuthSuccess(data.user);
    return data.user;
  };

  const googleLogin = async (token: string) => {
    const data = await authApi.googleLogin(token);
    if (!data?.user) throw new Error("Invalid Google login response");
    await handleAuthSuccess(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const refetchUser = async () => {
    const user = await authApi.getCurrentUser();
    setUser(user);
  };

  const currentUser = queryClient.getQueryData<User | null>(["currentUser"]) ?? null;

  const value: AuthContextType = {
    user: currentUser,
    login,
    register,
    googleLogin,
    logout,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
