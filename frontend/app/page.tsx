"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Shield, Users, Lock } from "lucide-react"

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Secure Authentication System</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Experience seamless login with email/password or Google OAuth integration
          </p>

          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-foreground">
                Welcome back, <span className="font-semibold text-primary">{user?.name || user?.email}</span>!
              </p>
              <Link href="/profile">
                <Button size="lg" className="mr-4">
                  Go to Profile
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link href="/login">
                <Button size="lg" className="mr-4">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Industry-standard security with encrypted passwords and secure token management
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <CardTitle>Google OAuth</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Quick and easy sign-in with your Google account for seamless access</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Lock className="h-12 w-12 text-accent mx-auto mb-4" />
              <CardTitle>Profile Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage your account details and preferences in a secure environment</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
