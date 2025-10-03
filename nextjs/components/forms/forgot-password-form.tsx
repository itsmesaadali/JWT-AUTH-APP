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


import { z } from "zod";
import { forgotPassFormSchema } from '@/lib/validation'
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";



export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isloading, setIsloading] = useState(false);


  const form = useForm<z.infer<typeof forgotPassFormSchema>>({
    resolver: zodResolver(forgotPassFormSchema),
    defaultValues: {
      email: "",
    },
  });

  

  async function onSubmit(values: z.infer<typeof forgotPassFormSchema>) {
    try {
      setIsloading(true);

        const { error } = await authClient.forgetPassword({
            email:values.email,
            redirectTo:'/auth/reset-password'
        })

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset email sent');
      }
    } finally {
      setIsloading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                
                <div className="grid gap-6">
                  {/* Email Field */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="n@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>


                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isloading}>
                    {isloading ? <Loading /> : "Reset Password"}
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
