"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Monitor, Smartphone, Tablet } from "lucide-react";
import { Session } from "./SessionManagement";

export function CurrentSession({ session }: { session: Session }) {
  const getDeviceIcon = () => {
    switch (session.deviceType) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <Card className="mb-6 border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Session</CardTitle>
            <CardDescription>This is the device you're currently using</CardDescription>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">{getDeviceIcon()}</div>
          <div className="flex-1 space-y-2">
            <p className="font-semibold text-lg">{session.device}</p>
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
        </div>
      </CardContent>
    </Card>
  );
}
