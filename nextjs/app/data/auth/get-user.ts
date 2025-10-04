// get-user.ts
import "server-only";
import { getSession } from "./get-session";

export async function getUserAndSession() {
  const result = await getSession();
  return result ?? null; // contains { user, session }
}
