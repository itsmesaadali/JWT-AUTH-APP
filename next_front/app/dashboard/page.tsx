'use client';


import useAuth from "@/hooks/use-auth";

export default function DashboardPage() {
  const { data: user, isLoading } = useAuth();

   if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {/* Logout button with an onClick handler */}
        {/* <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Logout
        </button> */}
      </div>

      <p className="text-lg mb-8">Welcome back! 🎉 Only logged-in users can see this page.</p>
      
      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h3 className="text-xl font-semibold mb-4">User Profile</h3>
          <div className="flex items-center mb-4">
            {user?.avatar && (
              <img 
                src={user.avatar} 
                alt="User Avatar" 
                className="w-20 h-20 rounded-full mr-4" 
              />
            )}
            <div>
              <p className="text-lg font-medium">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-mono text-sm">{user?._id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}