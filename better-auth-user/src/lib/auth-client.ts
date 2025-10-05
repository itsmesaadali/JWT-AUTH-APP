import { createAuthClient } from "better-auth/react";
import { lastLoginMethodClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3001",
  plugins: [lastLoginMethodClient()],
});

export const { signIn, signUp, useSession, signOut } = createAuthClient();
