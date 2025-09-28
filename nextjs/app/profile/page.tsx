'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  if (!user) return <p>Loading...</p>;

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/login');
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.avatar} alt="Avatar" width={100} />
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}