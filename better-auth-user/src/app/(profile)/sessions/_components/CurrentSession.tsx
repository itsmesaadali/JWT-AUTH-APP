"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Monitor, Smartphone} from "lucide-react";
import { Session } from "better-auth";
import {
  parseUserAgent,
  getBrowserInfo,
  formatDate,
  getDeviceType,
} from "../../../utils/sessionUtils";

export function CurrentSession({
  session,
  isCurrentSession,
}: {
  session: Session;
  isCurrentSession?: boolean;
}) {

  const userAgentInfo = parseUserAgent(session.userAgent!);
  const deviceType = getDeviceType(userAgentInfo);


  return (
    <Card className="mb-6 border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Session</CardTitle>
            <CardDescription>
              This is the device you're currently using
            </CardDescription>
          </div>
          {isCurrentSession && (
            <Badge className="bg-white animate-pulse">
              current session
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg text-primary">
            {deviceType === "mobile" ? (
              <Smartphone className="h-4 w-4" />
            ) : (
              <Monitor className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <p className="font-semibold">{getBrowserInfo(userAgentInfo)}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Created: {formatDate(session.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Expires: {formatDate(session.expiresAt)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
