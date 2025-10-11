"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, Monitor, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "../../../../components/ui/tabs";
import UAParser from 'ua-parser-js';
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

const getIcon = (deviceType: string) => {
  // Import icons as needed; for now, use generic
  const icons = {
    mobile: 'Smartphone',
    tablet: 'Tablet', // Assume imported
    desktop: 'Monitor',
  };
  // In actual code, dynamically select component, but for simplicity, use strings or import all
  // Here, we'll use a placeholder; adjust to actual icons
  switch (deviceType) {
    case 'mobile':
    case 'tablet':
      return 'Smartphone'; // Use Smartphone for mobile/tablet
    case 'desktop':
    default:
      return 'Monitor';
  }
};

const handleRevokeSession = async (token: string, setSessions: (sessions: Session[]) => void) => {
  try {
    await authClient.revokeSession({ token });
    toast("Session revoked", {
      description: "The session has been terminated successfully.",
    });
    // Refetch or filter
    // For now, filter out
    // setSessions(prev => prev.filter(s => s.token !== token));
    // Better to refetch
    fetchSessions(setSessions);
  } catch (error) {
    toast.error("Failed to revoke session");
  }
};

const fetchSessions = async (setSessions: (sessions: Session[]) => void, setLoading: (loading: boolean) => void) => {
  try {
    setLoading(true);
    const rawSessions = await authClient.listSessions();
    const currentUA = navigator.userAgent;
    
    const parsedSessions = rawSessions.map((session: Session) => {
      const parser = new UAParser(session.userAgent || '');
      const result = parser.getResult();
      const browser = result.browser.name || 'Unknown';
      const os = result.os.name || 'Unknown';
      const deviceModel = result.device.model || '';
      const deviceType = result.device.type || 'desktop';

      const deviceLabel = deviceModel 
        ? `${browser} on ${os} ${deviceModel}` 
        : `${browser} on ${os}`;

      const isCurrent = session.userAgent === currentUA; // Simple match; improve if needed

      return {
        ...session,
        device: deviceLabel,
        deviceType,
        icon: getIcon(deviceType), // Note: this is string; in render, use dynamic import or switch
        location: session.ipAddress || "Unknown Location",
        current: isCurrent,
      };
    });
    setSessions(parsedSessions);
  } catch (error) {
    toast.error("Failed to fetch sessions");
  } finally {
    setLoading(false);
  }
};

export function SessionList() {
  const [sessions, setSessions] = useState<any[]>([]); // Adjusted type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions(setSessions, setLoading);
  }, []);

  if (loading) {
    return (
      <TabsContent value="sessions" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>
              Manage your active sessions across different devices
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Spinner />
          </CardContent>
        </Card>
      </TabsContent>
    );
  }

  return (
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
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {/* Dynamic icon render; assume icons are imported */}
                    {session.icon === 'Smartphone' && <Smartphone className="h-5 w-5 text-muted-foreground" />}
                    {session.icon === 'Monitor' && <Monitor className="h-5 w-5 text-muted-foreground" />}
                    {/* Add others */}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{session.device}</p>
                      {session.current && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {session.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(session.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeSession(session.token, setSessions)}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
          {sessions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No active sessions found.</p>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}