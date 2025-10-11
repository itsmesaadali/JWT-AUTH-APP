"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Monitor, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "../../../../components/ui/tabs";
import { UAParser } from "ua-parser-js";
import { LoadingSuspense } from "../../../../components/loading-suspense";
import { Session } from "better-auth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function SessionList({
  sessions,
  currentSessionToken,
}: {
  sessions: Session[];
  currentSessionToken: string;
}) {
  const router = useRouter();
  const [loadingSessions, setLoadingSessions] = useState(new Set<string>());

  const otherSessions = sessions.filter(s => s.token !== currentSessionToken);
  const currentSession = sessions.find(s => s.token === currentSessionToken);

  const handleRevokeSession = async (sessionToken: string) => {
    setLoadingSessions(prev => new Set([...prev, sessionToken]));
    try {
      await authClient.revokeSession(
        { token: sessionToken },
        {
          onSuccess: () => {
            router.refresh();
            toast("Session revoked", {
              description: "The session has been terminated successfully.",
            });
          },
        }
      );
    } catch (error) {
      toast("Failed to revoke session", {
        description: "Please try again.",
      });
    } finally {
      setLoadingSessions(prev => {
        const newSet = new Set(prev);
        newSet.delete(sessionToken);
        return newSet;
      });
    }
  };

  function getBrowserInformation(userAgent: string | undefined) {
    if (!userAgent) return "Unknown Device";
    const userAgentInfo = UAParser(userAgent);
    if (!userAgentInfo.browser.name && !userAgentInfo.os.name) {
      return "Unknown Device";
    }
    if (!userAgentInfo.browser.name) return userAgentInfo.os.name;
    if (!userAgentInfo.os.name) return userAgentInfo.browser.name;
    return `${userAgentInfo.browser.name}, ${userAgentInfo.os.name}`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  function getDeviceIcon(userAgent: string | undefined) {
    if (!userAgent) return Monitor;
    const userAgentInfo = UAParser(userAgent);
    return userAgentInfo.device.type === "mobile" ? Smartphone : Monitor;
  }

  const renderSessionItem = (session: Session, isCurrent: boolean) => {
    const Icon = getDeviceIcon(session.userAgent!);
    const device = getBrowserInformation(session.userAgent!);
    const createdAt = formatDate(session.createdAt);
    const expiresAt = formatDate(session.expiresAt);
    const isLoading = loadingSessions.has(session.token);

    return (
      <div
        key={session.id}
        className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
      >
        <div className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{device}</p>
              {isCurrent && (
                <Badge variant="secondary" className="text-xs">
                  Current
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Created: {createdAt}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Expires: {expiresAt}
              </span>
            </div>
          </div>
        </div>
        {!isCurrent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleRevokeSession(session.token)}
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : "Revoke"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <LoadingSuspense>
      <TabsContent value="sessions" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Manage your active sessions across different devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.length === 0 ? (
                <p className="text-center text-muted-foreground">No active sessions</p>
              ) : (
                <>
                  {currentSession && renderSessionItem(currentSession, true)}
                  {otherSessions.map(session => renderSessionItem(session, false))}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </LoadingSuspense>
  );
}