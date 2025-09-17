// hooks/useCurrentUser.ts

'use client';

import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth.api';

export const useCurrentUser = () => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    
    // Add staleTime: Infinity to ensure cached data is used without refetching
    staleTime: Infinity, 
  });

  return {
    user: user || null,
    isLoading,
    isError,
    isAuthenticated: !!user,
  };
};