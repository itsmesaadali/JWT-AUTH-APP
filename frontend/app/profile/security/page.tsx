"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { ProfileSidebar } from "@/components/auth/profile-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Smartphone, AlertTriangle, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function SecurityPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Security Settings</h1>
                <p className="text-muted-foreground">Manage your account security and authentication methods</p>
              </div>

              {/* Security Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Overview</span>
                  </CardTitle>
                  <CardDescription>Your account security status and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-200">Account Verified</p>
                        <p className="text-sm text-green-600 dark:text-green-400">Your email is verified</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-200">Secure Authentication</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {user?.provider === "google" ? "Google OAuth enabled" : "Password protected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {user?.provider === "email" && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Consider enabling two-factor authentication for enhanced security.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Password Settings */}
              {user?.provider === "email" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="h-5 w-5" />
                      <span>Password</span>
                    </CardTitle>
                    <CardDescription>Manage your account password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Two-Factor Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5" />
                    <span>Two-Factor Authentication</span>
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">Authenticator App</p>
                        <Badge variant="secondary">Not Enabled</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app to generate verification codes
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">SMS Authentication</p>
                        <Badge variant="secondary">Not Enabled</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Receive verification codes via SMS</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Login Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Login Activity</CardTitle>
                  <CardDescription>Monitor recent access to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Just now</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Previous Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • 2 hours ago</p>
                      </div>
                      <Badge variant="secondary">Ended</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
