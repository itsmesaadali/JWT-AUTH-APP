'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// Import all necessary types and functions from the centralized auth.api file
import { authApi } from '@/lib/api/auth.api';
import type { LoginCredentials, RegisterData, User } from '@/lib/types/auth.types';

// Define the shape of our authentication context
interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  // We can add more properties here as needed, like `isLoading` or `error` state.
}

// Create the context with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The provider component that will wrap the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Helper function to handle common post-auth logic
  const handleAuthSuccess = async (user: User) => {
    // Set the user data in the cache. Using setQueryData is faster than invalidating.
    queryClient.setQueryData(['currentUser'], user);
    router.push('/dashboard');
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    handleAuthSuccess(response.user);
  };

  const register = async (userData: RegisterData) => {
    const response = await authApi.register(userData);
    handleAuthSuccess(response.user);
  };

  const googleLogin = async (token: string) => {
    const response = await authApi.googleLogin(token);
    handleAuthSuccess(response.user);
  };

  const logout = async () => {
    await authApi.logout();
    // Clear the user data from the cache
    queryClient.setQueryData(['currentUser'], null);
    router.push('/login')
  };

  // The value provided to components that consume this context
  const contextValue = { login, register, googleLogin, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};