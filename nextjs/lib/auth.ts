// lib/auth.ts
import API from './api';
import { User, LoginType } from '../types/user';

export const loginMutationFn = async (data: LoginType): Promise<User> => {
  const res = await API.post("/auth/login", data);
  return res.data.user;
};

export const logoutMutationFn = async (): Promise<void> => {
  await API.post("/auth/logout");
};

export const getProfileFn = async (): Promise<User | null> => {
  const res = await API.get("/users/me");
  return res.data.user || null;
};
export const registerMutationFn = async (email: string, password: string): Promise<void> => {
  await API.post('/auth/register', { email, password });
};


