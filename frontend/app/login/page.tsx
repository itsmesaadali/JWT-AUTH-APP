"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Separator } from "@/components/ui/separator"
import { Shield } from "lucide-react"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/profile")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">SecureAuth</h1>
              </div>
              <h2 className="text-4xl font-bold text-foreground text-balance">Welcome back to your secure account</h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Sign in to access your personalized dashboard and manage your account securely.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Secure authentication with industry standards</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-muted-foreground">Quick access with Google OAuth integration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-muted-foreground">Protected profile and data management</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">SecureAuth</h1>
              </div>
            </div>

            <LoginForm />

            <div className="max-w-md mx-auto w-full space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <GoogleAuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
