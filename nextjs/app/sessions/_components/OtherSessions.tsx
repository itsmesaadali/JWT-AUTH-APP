"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, MapPin, Clock, Monitor, Smartphone, Tablet } from "lucide-react";
import { Session } from "./SessionManagement";

export function OtherSessions({
  sessions,
  onRevokeAll,
  onRevoke,
}: {
  sessions: Session[];
  onRevokeAll: () => void;
  onRevoke: (id: string) => void;
}) {
  const getDeviceIcon = (deviceType: Session["deviceType"]) => {
    switch (deviceType) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Other Sessions</CardTitle>
            <CardDescription>Sessions on other devices where you're logged in</CardDescription>
          </div>
          {sessions.length > 0 && (
            <Button variant="destructive" size="sm" onClick={onRevokeAll}>
              Revoke All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No other active sessions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-3 bg-muted rounded-lg">{getDeviceIcon(session.deviceType)}</div>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold">{session.device}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {session.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.lastActive}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">IP: {session.ipAddress}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => onRevoke(session.id)}>
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
