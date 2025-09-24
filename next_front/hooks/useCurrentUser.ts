// hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await authApi.getCurrentUser();
      return user;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });
};
