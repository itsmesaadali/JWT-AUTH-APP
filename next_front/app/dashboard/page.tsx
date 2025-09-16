'use client';

// Remove the import of useCurrentUser
// import { useCurrentUser } from '@/hooks/useCurrentUser'; 
// We will get the user data from a context or a prop if we were to refactor further.
// For now, we will simply rely on the fact that the page is protected.
import { useCurrentUser } from '@/hooks/useCurrentUser';

const DashboardContent = () => {
  // Now, this is the only place this hook is called for the user data.
  const { user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading user details...</div>;
  }
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome back! 🎉 Only logged-in users can see this page.</p>
      
      {user && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>User Profile</h3>
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

export default DashboardContent;