'use client';

import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth.api';

export const useCurrentUser = () => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['currentUser'], // Unique key for this query
    queryFn: authApi.getCurrentUser, // The function to fetch data
    retry: false, // Don't retry on 401 errors
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });

  return {
    user: user || null, // Return user or null
    isLoading,
    isError,
    isAuthenticated: !!user, // A handy boolean flag
  };
};