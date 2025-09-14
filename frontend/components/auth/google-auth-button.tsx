"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: () => void
          renderButton: (element: HTMLElement, config: any) => void
        }
      }
    }
  }
}

export function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)
  const { googleLogin } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    // Load Google OAuth script
    const loadGoogleScript = () => {
      if (window.google) {
        setIsGoogleLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.google && GOOGLE_CLIENT_ID) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          })
          setIsGoogleLoaded(true)
        } else {
          console.warn("Google OAuth not configured properly")
          setIsGoogleLoaded(false)
        }
      }
      script.onerror = () => {
        console.error("Failed to load Google OAuth script")
        setIsGoogleLoaded(false)
        toast({
          title: "Google OAuth Error",
          description: "Failed to load Google authentication. Please try again later.",
          variant: "destructive",
        })
      }
      document.head.appendChild(script)
    }

    loadGoogleScript()
  }, [toast])

  const handleGoogleResponse = async (response: any) => {
    if (!response.credential) {
      toast({
        title: "Google Authentication Failed",
        description: "No credential received from Google. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const success = await googleLogin(response.credential)
      if (!success) {
        // Error handling is done in the useAuth hook
        console.log("Google authentication failed")
      }
    } catch (error) {
      console.error("Google auth error:", error)
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred during Google authentication.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    if (!isGoogleLoaded || !window.google) {
      toast({
        title: "Google OAuth Not Available",
        description: "Google authentication is not available. Please try again later.",
        variant: "destructive",
      })
      return
    }

    if (!GOOGLE_CLIENT_ID) {
      toast({
        title: "Configuration Error",
        description: "Google OAuth is not properly configured. Please contact support.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      window.google.accounts.id.prompt()
    } catch (error) {
      console.error("Google auth prompt error:", error)
      toast({
        title: "Authentication Error",
        description: "Failed to open Google authentication. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Reset loading state after a short delay to account for popup
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  // Fallback for when Google OAuth is not available
  const handleFallbackAuth = () => {
    toast({
      title: "Google Authentication Unavailable",
      description: "Google OAuth is currently unavailable. Please use email/password login instead.",
      variant: "destructive",
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full bg-transparent"
      onClick={isGoogleLoaded && GOOGLE_CLIENT_ID ? handleGoogleAuth : handleFallbackAuth}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
          {!isGoogleLoaded && !GOOGLE_CLIENT_ID && (
            <span className="ml-1 text-xs text-muted-foreground">(Unavailable)</span>
          )}
        </>
      )}
    </Button>
  )
}
