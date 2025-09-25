'use client';

import React, { createContext, useContext } from "react";
import useAuth from "@/hooks/use-auth";
import {  AuthContextType } from "@/lib/types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch} = useAuth();
  const user = data?.data?.user;

  return(
    <AuthContext.Provider 
      value={{ user, error, isLoading, isFetching, refetch }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if(!context) {
    throw new Error('UseAuthContext must be used with in AuthProvider');
  }

  return context;
}
