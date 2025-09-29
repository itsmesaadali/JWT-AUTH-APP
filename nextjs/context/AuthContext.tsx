"use client";

import { createContext, ReactNode } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getProfileFn, loginMutationFn, logoutMutationFn } from "@/lib/auth";
import { User, LoginType } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginType, onSuccess?: () => void, onError?: (err: any) => void) => void;
  logout: (onSuccess?: () => void, onError?: (err: any) => void) => void;
  refetch: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
  refetch: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileFn,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      queryClient.setQueryData(["profile"], null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        login: (data, onSuccess, onError) =>
          loginMutation.mutate(data, { onSuccess, onError }),
        logout: (onSuccess, onError) =>
          logoutMutation.mutate(undefined, { onSuccess, onError }),
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
