// require-user.ts
import "server-only";
import { redirect } from "next/navigation";
import { getUserAndSession } from "./get-user";

export async function requireUserAndSession() {
  const result = await getUserAndSession();

  if (!result?.user || !result?.session) {
    redirect("/auth/login");
  }

  return result; 
}
