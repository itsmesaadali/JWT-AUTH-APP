"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { authService, type User } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if user is authenticated by calling the profile endpoint
        const response = await authService.getProfile()
        
        if (response.success && response.user) {
          setUser(response.user)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("[v0] Auth initialization failed:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await authService.login({ email, password })

      if (response.success && response.user) {
        setUser(response.user)
        setIsAuthenticated(true)

        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        router.push("/profile")
        return true
      } else {
        toast({
          title: "Login failed",
          description: response.message || "Please check your credentials and try again.",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error("[v0] Login error:", error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await authService.register({ name, email, password, confirmPassword })

      if (response.success && response.user) {
        setUser(response.user)
        setIsAuthenticated(true)

        toast({
          title: "Registration successful",
          description: "Welcome! Your account has been created.",
        })
        router.push("/profile")
        return true
      } else {
        toast({
          title: "Registration failed",
          description: response.message || "Please check your information and try again.",
          variant: "destructive",
        })
        return false
      }
    } catch (error: any) {
      console.error("[v0] Registration error:", error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error: any) {
      console.error("[v0] Logout error:", error)
      // Even if the API call fails, clear local state
      setUser(null)
      setIsAuthenticated(false)
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      })
      router.push("/login")
    }
  }

  const refreshAuth = async () => {
    try {
      // Refresh the authentication by getting the latest user profile
      const response = await authService.getProfile()
      if (response.success && response.user) {
        setUser(response.user)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("[v0] Auth refresh failed:", error)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}