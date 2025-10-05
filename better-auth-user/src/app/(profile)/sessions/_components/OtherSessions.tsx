"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
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
import { useRouter } from "next/navigation";

export function OtherSessions({
  sessions,
}: {
  sessions: Session[];
}) {

  const router = useRouter()
  const [revoking, setRevoking] = useState(false);

  const handleRevoke = async (token: string) => {
    if (revoking) return;
    setRevoking(true);
    try {
      const res = await authClient.revokeSession({ token });

      if(res.error) {
        toast.error("Fail to revoke other session")
      }
      else{
        toast.success("Session revoke successfully")
        router.refresh()
      }

    } catch (error:any) {
      toast.error(error.message ||"Failed to revoke session");
    } finally {
      setRevoking(false);
    }
  };

  const handleRevokeAll = async () => {
    if (revoking) return;
    setRevoking(true);
    try {
      const res = await authClient.revokeOtherSessions() 
      if(res.error) {
        toast.error("Failed to revoke other sessions")
      }
      else{
        toast.success("Sessions revoke successfully")
        router.refresh()
      }
    } catch (error:any) {
      toast.error(error.message ||"Failed to revoke other sessions",);
    } finally {
      setRevoking(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Other Sessions</CardTitle>
            <CardDescription>
              Sessions on other devices where you're logged in
            </CardDescription>
          </div>
          {sessions.length > 0 && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleRevokeAll}
              disabled={revoking}
            >
              {revoking ? <Spinner/> : "Revoke All"}
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
            {sessions.map((session) => {
              const userAgentInfo = parseUserAgent(session.userAgent!);
              const deviceType = getDeviceType(userAgentInfo);
              return (
                <div
                  key={session.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-3 bg-muted rounded-lg">
                    {deviceType === "mobile" ? (
                      <Smartphone className="h-5 w-5" />
                    ) : deviceType === "tablet" ? (
                      <Tablet className="h-5 w-5" />
                    ) : (
                      <Monitor className="h-5 w-5" />
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevoke(session.token)}
                    disabled={revoking}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {revoking ? <Spinner/> : "Revoke"}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}