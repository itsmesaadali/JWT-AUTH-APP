'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Pass the user data to the children via a React Context or directly
  // The simplest way is to handle the loading and authentication check here
  // and then let the children render once ready.

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    // If authenticated, render the children components.
    // The DashboardContent component below will no longer call useCurrentUser
    // as it will get the data from its parent or a context.
    return <>{children}</>;
  }

  return null;
}