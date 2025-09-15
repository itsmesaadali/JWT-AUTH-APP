'use client';

import LoginForm  from '../../components/LoginForm';
import GoogleSignIn from '../../components/GoogleSignIn';

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
