'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and the user is not authenticated, redirect
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // While loading, show a loader
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If authenticated, render the children components
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Otherwise, render nothing (as the redirect will happen)
  return null;
}