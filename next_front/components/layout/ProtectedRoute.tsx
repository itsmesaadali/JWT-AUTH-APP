'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import DashboardLoading from '@/app/dashboard/loading';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect logic should live in useEffect to avoid render-phase issues
  useEffect(() => {
    if (!isLoading) {
      // If not loading and not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push('/login');
      } 
      // If not loading and authenticated, but on the login page, redirect to dashboard
      // This is for cases where a logged-in user tries to manually visit /login
      else if (pathname === '/login') {
        router.push('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // Handle loading state
  if (isLoading) {
    return <DashboardLoading />;
  }

  // Render the children if authenticated, otherwise return null
  return isAuthenticated ? <>{children}</> : null;
}