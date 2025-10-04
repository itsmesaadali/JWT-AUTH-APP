"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { CurrentSession } from "./CurrentSession";
import { OtherSessions } from "./OtherSessions";
import { RevokeDialog } from "./RevokeDialog";

export interface Session {
  id: string;
  device: string;
  deviceType: "desktop" | "mobile" | "tablet";
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export function SessionManagement() {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      device: "Chrome on Windows",
      deviceType: "desktop",
      location: "New York, USA",
      ipAddress: "192.168.1.1",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone 15",
      deviceType: "mobile",
      location: "New York, USA",
      ipAddress: "192.168.1.2",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Chrome on MacBook Pro",
      deviceType: "desktop",
      location: "San Francisco, USA",
      ipAddress: "192.168.1.3",
      lastActive: "1 day ago",
      isCurrent: false,
    },
    {
      id: "4",
      device: "Firefox on iPad",
      deviceType: "tablet",
      location: "Los Angeles, USA",
      ipAddress: "192.168.1.4",
      lastActive: "3 days ago",
      isCurrent: false,
    },
  ]);

  const [sessionToRevoke, setSessionToRevoke] = useState<string | null>(null);

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
    setSessionToRevoke(null);
    toast("Session Revoked", {
      description: "The session has been terminated successfully.",
    });
  };

  const handleRevokeAllSessions = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
    toast("All Sessions Revoked", {
      description:
        "All other sessions have been terminated. Only your current session remains active.",
    });
  };

  const currentSession = sessions.find((s) => s.isCurrent);
  const otherSessions = sessions.filter((s) => !s.isCurrent);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <a href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </a>
        </Button>
        <h1 className="text-4xl font-bold text-balance mb-2">
          Session Management
        </h1>
        <p className="text-muted-foreground text-pretty">
          View and manage all active sessions across your devices
        </p>
      </div>

      {currentSession && <CurrentSession session={currentSession} />}

      <OtherSessions
        sessions={otherSessions}
        onRevokeAll={handleRevokeAllSessions}
        onRevoke={(id) => setSessionToRevoke(id)}
      />

      <RevokeDialog
        open={sessionToRevoke !== null}
        onClose={() => setSessionToRevoke(null)}
        onConfirm={() => sessionToRevoke && handleRevokeSession(sessionToRevoke)}
      />
    </div>
  );
}
