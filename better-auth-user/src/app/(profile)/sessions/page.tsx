import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { SessionManagement } from "./_components/SessionManagement";
import { redirect } from "next/navigation";

export default async function SessionsPage() {
  try {
    const sessions = await auth.api.listSessions({ headers: await headers() });

    if (!sessions || sessions.length === 0) {
      return redirect("/auth/login");
    }

    return (
      <SessionManagement
        sessions={sessions}
        currentSessionToken={sessions[0]?.token}
      />
    );
  } catch (error) {
    return redirect("/auth/login");
  }
}
