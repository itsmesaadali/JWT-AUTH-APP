"use client";

// app/dashboard/_components/ProfileDashboard.tsx

import { ProfilePictureSection } from "./ProfilePictureSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { AccountSecuritySection } from "./AccountSecuritySection";

import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";

// define props type
interface ProfileDashboardProps {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
  };
}

export function ProfileDashboard({ user }: ProfileDashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-balance mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground text-pretty">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <a href="/sessions" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Sessions
            </a>
          </Button>
        </div>
      </div>

      <ProfilePictureSection user={user} />
      <PersonalInfoSection user={user} />
      <AccountSecuritySection user={user} />
    </div>
  );
}
