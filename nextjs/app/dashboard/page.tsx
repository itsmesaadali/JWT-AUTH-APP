import { ProfileDashboard } from "./_components/ProfileDashboard";
import { requireUserAndSession } from "../data/auth/require-user";

export default async function Dashboard() {
  const { user } = await requireUserAndSession();

  return (
    <div>
      <ProfileDashboard user={user} />
    </div>
  );
}
