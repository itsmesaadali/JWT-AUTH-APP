import { toast } from "@/hooks/use-toast"

export interface AppError {
  code: string
  message: string
  details?: string
  statusCode?: number
}

export class AuthError extends Error {
  code: string
  statusCode: number
  details?: string

  constructor(message: string, code: string, statusCode = 400, details?: string) {
    super(message)
    this.name = "AuthError"
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}

export class NetworkError extends Error {
  statusCode: number
  details?: string

  constructor(message: string, statusCode = 500, details?: string) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
    this.details = details
  }
}

export class ValidationError extends Error {
  field?: string
  details?: string

  constructor(message: string, field?: string, details?: string) {
    super(message)
    this.name = "ValidationError"
    this.field = field
    this.details = details
  }
}

// Error type guards
export const isAuthError = (error: any): error is AuthError => {
  return error instanceof AuthError || error.name === "AuthError"
}

export const isNetworkError = (error: any): error is NetworkError => {
  return error instanceof NetworkError || error.name === "NetworkError"
}

export const isValidationError = (error: any): error is ValidationError => {
  return error instanceof ValidationError || error.name === "ValidationError"
}

// Error message mapping
const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "Invalid email or password. Please check your credentials and try again.",
  ACCOUNT_LOCKED: "Your account has been temporarily locked due to multiple failed login attempts.",
  EMAIL_NOT_VERIFIED: "Please verify your email address before signing in.",
  ACCOUNT_DISABLED: "Your account has been disabled. Please contact support for assistance.",
  TOKEN_EXPIRED: "Your session has expired. Please sign in again.",
  INVALID_TOKEN: "Invalid authentication token. Please sign in again.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists. Please use a different email or try signing in.",
  WEAK_PASSWORD: "Password is too weak. Please choose a stronger password.",
  INVALID_EMAIL: "Please enter a valid email address.",
  GOOGLE_AUTH_FAILED: "Google authentication failed. Please try again.",
  GOOGLE_TOKEN_INVALID: "Invalid Google token. Please try signing in again.",
  GOOGLE_ACCOUNT_NOT_ALLOWED: "This Google account is not allowed. Please contact support.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  MAINTENANCE_MODE: "The service is currently under maintenance. Please try again later.",
}

export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") {
    return ERROR_MESSAGES[error] || error
  }

  if (error?.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code]
  }

  if (error?.message) {
    return error.message
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR
}

// Enhanced error handler with toast notifications
export const handleError = (error: any, context?: string) => {
  console.error(`Error in ${context || "application"}:`, error)

  let title = "Error"
  let description = getErrorMessage(error)
  let variant: "default" | "destructive" = "destructive"

  if (isAuthError(error)) {
    title = "Authentication Error"
    if (error.code === "TOKEN_EXPIRED") {
      variant = "default"
      description = "Your session has expired. Please sign in again."
    }
  } else if (isNetworkError(error)) {
    title = "Connection Error"
    if (error.statusCode >= 500) {
      description = "Server error. Please try again later."
    }
  } else if (isValidationError(error)) {
    title = "Validation Error"
  }

  toast({
    title,
    description,
    variant,
  })

  if (process.env.NODE_ENV === "production") {
    // Log to monitoring service in production
  }
}

// Simple async error wrapper
export function withErrorHandling(fn: Function, context?: string) {
  return async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      handleError(error, context)
      return null
    }
  }
}

// Simple retry mechanism
export async function withRetry(fn: Function, maxRetries = 3, delay = 1000) {
  let lastError: any

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error

      if (i === maxRetries) {
        throw error
      }

      if (isAuthError(error) && error.statusCode === 401) {
        throw error
      }

      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)))
    }
  }

  throw lastError
}
