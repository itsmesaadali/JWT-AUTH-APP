"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, Smartphone, Monitor, Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const sessions = [
  {
    id: 1,
    device: "Chrome on MacBook Pro",
    location: "San Francisco, CA",
    lastActive: "2 minutes ago",
    current: true,
    icon: Chrome,
  },
  {
    id: 2,
    device: "Safari on iPhone 15 Pro",
    location: "San Francisco, CA",
    lastActive: "2 hours ago",
    current: false,
    icon: Smartphone,
  },
  {
    id: 3,
    device: "Chrome on Windows",
    location: "New York, NY",
    lastActive: "1 day ago",
    current: false,
    icon: Monitor,
  },
];

export function SessionList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
        <CardDescription>Manage your active sessions</CardDescription>
      </CardHeader>
      <CardContent>
        {sessions.map((session) => (
          <div key={session.id} className="flex justify-between items-center border p-4 rounded-lg mb-3">
            <div className="flex gap-3">
              <session.icon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium flex gap-2 items-center">
                  {session.device}
                  {session.current && <Badge variant="secondary">Current</Badge>}
                </p>
                <p className="text-xs text-muted-foreground flex gap-2">
                  <MapPin className="h-3 w-3" /> {session.location}
                  <Calendar className="h-3 w-3" /> {session.lastActive}
                </p>
              </div>
            </div>
            {!session.current && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast("Session revoked", { description: session.device })}
              >
                Revoke
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
