import { redirect } from "next/navigation";
import { ProfileDashboard } from "./_components/ProfileDashboard";
import { authClient } from "@/lib/auth-client";

export default async function Dashboard() {
  const { data: session } = await authClient.getSession()

  if(!session){
    console.error("no session start")
    redirect('/auth/login')
  }

  return (
    <div>
      <ProfileDashboard user={session.user} />
    </div>
  );
}
