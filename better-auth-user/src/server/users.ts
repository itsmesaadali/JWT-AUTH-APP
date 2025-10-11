"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: { email, password },
    });

    return {
      success: true,
      message: "Logged in successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const signUp = async (username: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: { email, password, name: username },
    });

    return {
      success: true,
      message: "Signed up successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const signOutAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Signed out successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to sign out.",
    };
  }
};


export const deleteAccountAction = async () => {
  try {
    await auth.api.deleteUser({
      body: {}, // ✅ required even if empty
      headers: await headers(),
    });

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Account deleted successfully.",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete account.",
    };
  }
};
