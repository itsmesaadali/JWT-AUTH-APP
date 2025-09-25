// hooks/use-auth.ts
'use client'

import { useQuery } from "@tanstack/react-query";
import { getCurrentUserFn } from '@/lib/api/auth.api'

const useAuth = () =>  {
  const query = useQuery({
    queryKey:['authUser'],
    queryFn:getCurrentUserFn,
    staleTime:Infinity,
  });
  
  return query;
}

export default useAuth;
