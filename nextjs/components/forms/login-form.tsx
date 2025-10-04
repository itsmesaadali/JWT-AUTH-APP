"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/loading";

import { signIn } from "@/server/users";

import z from "zod";
import { loginFormSchema } from "@/lib/validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const lastMethod = authClient.getLastUsedLoginMethod();

  const [isloading, setIsloading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setIsloading(true);
      const { success, message } = await signIn(values.email, values.password);

      if (success) {
        toast.success(message as string);
        router.push("/");
      } else {
        toast.error(message as string);
      }
    } finally {
      setIsloading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full relative"
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loading />
                        Login...
                      </span>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        Login with Google
                        {lastMethod === "google" && (
                          <Badge className="absolute right-2 text-[9px]">
                            last used
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  {/* Email Field */}
                  <div className="grid gap-3">  
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Email</FormLabel>
                            {lastMethod === "email" && (
                              <Badge className="text-[9px]">last used</Badge>
                            )}
                          </div>
                          <FormControl>
                            <Input placeholder="n@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>

                          <FormControl>
                            <Input
                              type="password"
                              placeholder="*******"
                              {...field}
                            />
                          </FormControl>
                          <Link
                            href="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isloading}>
                    {isloading ? <Loading /> : "Login"}
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[Link]:hover:text-primary text-center text-xs text-balance *:[Link]:underline *:[Link]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
