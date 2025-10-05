"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Monitor, Smartphone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "better-auth";
import { useState } from "react";
import {
  parseUserAgent,
  getBrowserInfo,
  formatDate,
  getDeviceType,
} from "../../../utils/sessionUtils";
import { authClient } from "../../../../lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "../../../../components/ui/spinner";
import { redirect } from "next/navigation";

export function CurrentSession({
  session,
  isCurrentSession,
}: {
  session: Session;
  isCurrentSession?: boolean;
}) {
  const [revoking, setRevoking] = useState(false);
  const userAgentInfo = parseUserAgent(session.userAgent!);
  const deviceType = getDeviceType(userAgentInfo);

  const handleRevoke = async () => {
    if (revoking) return;
    setRevoking(true);
    try {
      const res = await authClient.revokeSession({ token: session.token });

      if (res.error) {
        toast.error("Fail to revoke other session");
      } else {
        toast.success("Session revoke successfully");
      }
      redirect('/auth/login')
    } catch (error:any) {
      toast.error(error.message || "Failed to revoke session");
    } finally {
      setRevoking(false);
    }
  };

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
            <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">
              Active
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
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRevoke}
          disabled={revoking}
          className="mt-4"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          {revoking ? <Spinner/> : "Revoke"}
        </Button>
      </CardContent>
    </Card>
  );
}
