import { api } from '../utils/axios';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '../types/auth.types'; // Import types from the new file

export const authApi = {
  googleLogin: async (token: string) => {
    const response = await api.post('/auth/google', { token });
    return response.data;
  },
  register: async (userData: RegisterData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  refreshToken: async () => {
    const response = await api.get('/auth/refresh');
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await api.post('/auth/password/forgot', { email });
    return response.data;
  },
  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.post(`/auth/password/reset/${token}`, { newPassword });
    return response.data;
  },
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data.user;
  },
  verifyEmail: async (token: string) => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },
};