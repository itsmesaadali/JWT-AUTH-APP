'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div style={{ padding: '2rem' }}>
        <h1>Dashboard</h1>
        <p>Only logged-in users can see this page 🎉</p>
      </div>
    </ProtectedRoute>
  );
}
