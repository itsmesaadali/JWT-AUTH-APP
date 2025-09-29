// hooks/useLogout.ts
import { useMutation } from '@tanstack/react-query';
import { logoutMutationFn } from '../lib/auth';

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutMutationFn,
  });
};