"use client"

import { useSearchParams } from "next/navigation"
import { AuthErrorPage } from "@/components/auth/auth-error-page"
import { Suspense } from "react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "Unknown Error"
  const description = searchParams.get("description") || "An unexpected error occurred during authentication."

  return <AuthErrorPage error={error} description={description} />
}

export default function AuthErrorPageRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  )
}
