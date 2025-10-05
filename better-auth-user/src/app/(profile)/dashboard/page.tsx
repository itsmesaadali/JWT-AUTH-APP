import { redirect } from "next/navigation";
import { ProfileDashboard } from "./_components/ProfileDashboard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

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
