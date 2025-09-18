"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleScript } from "@/lib/utils/loadGoogleScript";
import { useAuthActions } from "@/lib/action/action";

export function useGoogleAuthButton() {
  const { handleGoogleLogin } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);
  const googleSignInButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGoogleSignIn = async () => {
      try {
        await loadGoogleScript();

        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (response: any) => {
              if (response.credential) {
                await handleGoogleLogin(response.credential, setIsLoading);
              } else {
                setIsLoading(false); // no credential
              }
            },
          });

          // Catch cancel/dismiss popup events
          window.google.accounts.id.prompt((notification: any) => {
            if (
              notification.isNotDisplayed() ||
              notification.isSkippedMoment()
            ) {
              setIsLoading(false);
            }
          });

          window.google.accounts.id.renderButton(googleSignInButtonRef.current, {
            theme: "outline",
            size: "large",
          });
        }
      } catch (error) {
        console.error("Google Sign-In failed:", error);
        setIsLoading(false);
      }
    };

    initializeGoogleSignIn();
  }, [handleGoogleLogin]);

  const handleCustomGoogleClick = () => {
    if (googleSignInButtonRef.current) {
      setIsLoading(true);
      const googleButton = googleSignInButtonRef.current.querySelector(
        'div[role="button"]'
      ) as HTMLElement;
      if (googleButton) {
        googleButton.click();
      }
    }
  };

  return { isLoading, setIsLoading, googleSignInButtonRef, handleCustomGoogleClick };
}
