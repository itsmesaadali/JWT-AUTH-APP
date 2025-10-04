// _components/useGoogleSignIn.ts
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export const useGoogleSignIn = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    signInWithGoogle,
    isGoogleLoading
  };
};