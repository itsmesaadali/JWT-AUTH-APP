'use client';

import React, { createContext, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { authApi, LoginCredentials, RegisterData, User } from '@/lib/api/auth.api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleAuthSuccess = (user: User) => {
    // Manually set the user data in the cache after login/register
    queryClient.setQueryData(['currentUser'], user);
    router.push('/dashboard'); // Redirect on success
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
    // Invalidate the user data in the cache
    queryClient.setQueryData(['currentUser'], null);
    router.push('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};