'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

// Load Google script dynamically
const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('google-script')) {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = 'google-script';
    script.onload = () => resolve();
    script.onerror = () => reject('Google script failed to load');
    document.body.appendChild(script);
  });
};

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { googleLogin } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await loadGoogleScript();

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );

      // Show the hidden div
      document.getElementById('googleSignInButton')!.style.display = 'block';
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      setLoading(false);
    }
  };

  const handleGoogleResponse = async (response: any) => {
    try {
      await googleLogin(response.credential);
    } catch (error: any) {
      console.error('Login failed:', error.message);
      alert(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? 'Loading...' : 'Sign in with Google'}
      </button>
      <div id="googleSignInButton" style={{ display: 'none' }}></div>
    </div>
  );
};

export default GoogleSignIn;
