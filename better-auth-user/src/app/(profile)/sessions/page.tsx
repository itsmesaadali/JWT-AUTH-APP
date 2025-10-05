import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { SessionManagement } from "./_components/SessionManagement";
import { redirect } from "next/navigation";

export default async function SessionsPage() {
  const sessions = await auth.api.listSessions({ headers: await headers() });

  if (!sessions || sessions.length === 0) {
    console.error("No active sessions found");
    redirect("/auth/login");
  }

  // Decide how to get current session token (adjust if your API differs)
  const currentSessionToken = sessions[0]?.token;

  return (
    <SessionManagement
      sessions={sessions}
      currentSessionToken={currentSessionToken}
    />
  );
}
