"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CurrentSession } from "./CurrentSession";
import { OtherSessions } from "./OtherSessions";
import { Session } from "better-auth";

export function SessionManagement({
  sessions,
  currentSessionToken,
}: {
  sessions: Session[];
  currentSessionToken: string;
}) {
  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);
  const currentSession = sessions.find((s) => s.token === currentSessionToken);

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

      {currentSession && (
        <CurrentSession
          session={currentSession}
          isCurrentSession
        />
      )}

      <OtherSessions
        sessions={otherSessions}
      />
    </div>
  );
}