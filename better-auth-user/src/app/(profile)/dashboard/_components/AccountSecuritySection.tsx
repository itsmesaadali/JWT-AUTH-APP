"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { ChangeEmailForm } from "./ChangeEmailForm";
import { ChangePasswordForm } from "./Security-info";

export function AccountSecuritySection({ user }: { user: { email: string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Security</CardTitle>
        <CardDescription>Manage your email and password</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Section */}
        <div className="space-y-2">
          <Label>Email Address</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={user.email} readOnly className="pl-10 bg-muted" />
            </div>
            <ChangeEmailForm />
          </div>
        </div>

        {/* Password Section */}
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" value="••••••••" readOnly className="pl-10 bg-muted" />
            </div>
            <ChangePasswordForm />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
