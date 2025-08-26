import { cookies } from "next/headers";

export interface JwtPayload {
    userId:string;
}

export async function setTokenCookie(name: string, value: string, maxAge: number) {
  const cookieStore = await cookies();
  cookieStore.set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}


export async function deleteTokenCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

export async function getTokenFromCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
}