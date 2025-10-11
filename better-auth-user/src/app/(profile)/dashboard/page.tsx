// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ProfileSettings } from "./_components/profile";

export default async function Dashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/auth/login");

  return (
    <div>
      <ProfileSettings user={session.user} />
    </div>
  );
}
