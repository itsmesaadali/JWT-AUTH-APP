'use client'
// import { redirect } from "next/navigation";
// import { ProfileDashboard } from "./_components/ProfileDashboard";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
import { ProfileSettings } from "./_components/profile";
import { useState } from "react";
import { Navbar } from "../../../components/common/navbar";

export default async function Dashboard() {
  // const session = await auth.api.getSession({ headers: await headers() });

  // if(!session){
  //   redirect('/auth/login')
  // }

   const [user, setUser] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    avatar: "/professional-avatar.png",
  })


  return (
    <div>
        <Navbar  user={user} />

      <ProfileSettings user={user} setUser={setUser} />
      {/* <ProfileDashboard user={session.user} /> */}
    </div>
  );
}
