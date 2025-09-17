'use client';

import LoginForm from '@/components/auth/LoginForm'; // Updated path
import GoogleSignIn from '@/components/auth/GoogleSignIn'; // Unchanged

export default function LoginPage() {
  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <LoginForm />
      <div style={{ marginTop: '1rem' }}>
        <GoogleSignIn />
      </div>
    </div>
  );
}