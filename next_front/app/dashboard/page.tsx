'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useCurrentUser } from '@/hooks/useCurrentUser';

// It's good practice to put the client logic in its own component
const DashboardContent = () => {
  // 1. Get user data and loading state from our custom hook
  const { user, isLoading } = useCurrentUser();
    // Add this console.log to see what the hook returns
  console.log('User object from hook:', user);
  console.log('Is Loading:', isLoading);

  // 2. Show a loading message while fetching user data
  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  // 3. Render the user details once loaded
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome back! 🎉 Only logged-in users can see this page.</p>
      
      {/* Display user information */}
      {user && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>User Profile</h3>
          {/* Use optional chaining (?.) to safely access properties */}
          {user?.avatar && (
            <img 
              src={user.avatar} 
              alt="User Avatar" 
              style={{ width: '80px', height: '80px', borderRadius: '50%' }} 
            />
          )}
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?._id}</p>
        </div>
      )}
    </div>
  );
};


export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}