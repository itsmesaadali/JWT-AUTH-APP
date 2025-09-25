'use client';

import { useAuth } from '@/context/auth-provider';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <h1>My App</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}