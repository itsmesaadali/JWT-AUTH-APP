import API from './api';
import { User } from '../types/user';

export const login = async (email: string, password: string): Promise<void> => {
  await API.post('/auth/login', { email, password });
};

export const register = async (email: string, password: string): Promise<void> => {
  await API.post('/auth/register', { email, password });
};

export const getProfile = async (): Promise<User> => {
  const res = await API.get('/users/me');
  return res.data;
};

export const refreshToken = async (): Promise<void> => {
  await API.get('/auth/refresh');
};
