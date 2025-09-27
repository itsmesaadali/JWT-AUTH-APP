'use client';

import { useState, useContext } from 'react';
import { login, getProfile } from '@/lib/auth';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; // ✅ FIXED

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const router = useRouter(); // ✅ FIXED

  const handleLogin = async () => {
    try {
      await login(email, password);
      const profile = await getProfile();
      setUser(profile);
      router.push('/profile'); // ✅ works with next/navigation
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
