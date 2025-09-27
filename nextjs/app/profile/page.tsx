'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/lib/auth';
import { User } from '@/types/user';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <img src={user.avatar} alt="Avatar" width={100} />
      <p>Email: {user.email}</p>
    </div>
  );
}
