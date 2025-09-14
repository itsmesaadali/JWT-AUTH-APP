"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { ProfileForm } from "@/components/auth/profile-form"
import { ProfileSidebar } from "@/components/auth/profile-sidebar"

export default function ProfilePage() {
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
            <div className="lg:col-span-3">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
