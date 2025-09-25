// lib/api/auth.api.ts
import API from "../axios-client";
import type { LoginType, RegisterType } from "../types/auth.types";

export const loginMutationFn = async (data: LoginType) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerMutationFn = async (data: RegisterType) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const logoutMutationFn = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

export const getCurrentUserFn = async () => {
  const res = await API.get("/users/me");
  return res.data;   // ✅ only return the user object
};
