"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { SignupForm } from "@/components/auth/SignupForm"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center space-x-1 mb-6">
            <Button variant={isLogin ? "default" : "ghost"} onClick={() => setIsLogin(true)} className="px-8">
              Sign In
            </Button>
            <Button variant={!isLogin ? "default" : "ghost"} onClick={() => setIsLogin(false)} className="px-8">
              Sign Up
            </Button>
          </div>
        </div>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="font-medium text-primary hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="font-medium text-primary hover:underline">
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
