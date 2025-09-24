// components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/utils/validateSchema";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@/lib/action/action";
import { Input } from "../ui/input";
import { useGoogleAuthButton } from "@/hooks/useGoogleAuthButton";

export function LoginForm() {
  const { login } = useAuthActions();
  const { isLoading: googleLoading, googleSignInButtonRef, handleCustomGoogleClick } = useGoogleAuthButton();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    await login(values, setIsLoading);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full bg-transparent flex items-center justify-center gap-2"
          onClick={handleCustomGoogleClick}
          disabled={googleLoading}
        >
          {googleLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <FaGoogle className="h-5 w-5 text-black" />}
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </Button>
        <div ref={googleSignInButtonRef} style={{ display: "none" }} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField name="email" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="Enter your email" type="email" {...field} disabled={isLoading} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input placeholder="Enter your password" type="password" {...field} disabled={isLoading} /></FormControl>
                <FormMessage />
              </FormItem>
            )}/>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign In"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account? <a href="/signup" className="text-primary">Sign up</a>
        </p>
      </CardContent>
    </Card>
  );
}
