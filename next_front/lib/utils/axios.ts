// lib/utils/axios.ts
import axios from "axios";
import { authApi } from "../api/auth.api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Single request interceptor (no duplicates)
api.interceptors.request.use(
  (config) => {
    // You may add auth header here if you store tokens locally
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token once on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await authApi.refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        // if refresh failed, redirect to login (client-side only)
        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
