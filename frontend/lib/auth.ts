import axios from "axios"

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  provider?: "email" | "google"
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export interface RefreshTokenResponse {
  success?: boolean
  message?: string
}

// Create axios instance with base configuration
export const authApi = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This is crucial for cookie-based authentication
})

// Since we're using cookies, we don't need to manually add tokens to headers
// The browser will automatically send cookies with each request

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // For cookie-based auth, we just need to call the refresh endpoint
        // The refresh token is automatically sent via cookies
        const refreshResponse = await authApi.post("/auth/refresh")
        
        if (refreshResponse.status === 200) {
          // Retry the original request
          return authApi(originalRequest)
        }
      } catch (refreshError) {
        console.error("[v0] Token refresh failed:", refreshError)
        authService.logout()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// Auth API functions
export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await authApi.post("/auth/login", data)
      return {
        success: true,
        message: response.data.message,
        user: response.data.user
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: "Invalid email or password. Please check your credentials and try again.",
        }
      }
      if (error.response?.status === 429) {
        return {
          success: false,
          message: "Too many login attempts. Please wait a few minutes before trying again.",
        }
      }
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again.",
      }
    }
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await authApi.post("/auth/register", data)
      return {
        success: true,
        message: response.data.message,
        user: response.data.user
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        return {
          success: false,
          message: "An account with this email already exists. Please use a different email or try logging in.",
        }
      }
      if (error.response?.status === 422) {
        return {
          success: false,
          message: "Invalid registration data. Please check your information and try again.",
        }
      }
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again.",
      }
    }
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    try {
      const response = await authApi.post("/auth/refresh")
      return {
        success: true,
        message: response.data.message,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Token refresh failed",
      }
    }
  },

  logout: async (): Promise<AuthResponse> => {
    try {
      const response = await authApi.post("/auth/logout")
      return {
        success: true,
        message: response.data.message,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Logout failed",
      }
    }
  },

  getProfile: async (): Promise<AuthResponse> => {
    try {
      const response = await authApi.get("/users/me")
      return {
        success: true,
        message: "Profile fetched successfully",
        user: response.data.user
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: "Authentication expired. Please log in again.",
        }
      }
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch profile. Please try again.",
      }
    }
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post("/auth/forgot-password", { email })
      return {
        success: true,
        message: response.data.message,
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        return {
          success: false,
          message: "No account found with this email address. Please check your email or create a new account.",
        }
      }
      if (error.response?.status === 429) {
        return {
          success: false,
          message: "Too many password reset requests. Please wait before trying again.",
        }
      }
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send password reset email. Please try again.",
      }
    }
  },
}