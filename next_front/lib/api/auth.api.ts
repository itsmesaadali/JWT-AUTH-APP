// lib/api/auth.api.ts
import { api } from "../utils/axios";
import type { AuthResponse, LoginCredentials, RegisterData, User } from "../types/auth.types";

export const authApi = {
  googleLogin: async (token: string) => {
    const { data } = await api.post<AuthResponse>("/auth/google", { token });
    return data;
  },
  register: async (userData: RegisterData) => {
    const { data } = await api.post<AuthResponse>("/auth/register", userData);
    return data;
  },
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<AuthResponse>("/auth/login", credentials);
    return data;
  },
  refreshToken: async () => {
    const { data } = await api.get("/auth/refresh");
    return data;
  },
  logout: async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  },
  forgotPassword: async (email: string) => {
    const { data } = await api.post("/auth/password/forgot", { email });
    return data;
  },
  resetPassword: async (token: string, newPassword: string) => {
    const { data } = await api.post(`/auth/password/reset/${token}`, { newPassword });
    return data;
  },
  getCurrentUser: async (): Promise<User | null> => {
    const { data } = await api.get<{ user: User }>("/users/me");
    return data?.user ?? null;
  },
  verifyEmail: async (token: string) => {
    const { data } = await api.get(`/auth/verify-email/${token}`);
    return data;
  },
};
