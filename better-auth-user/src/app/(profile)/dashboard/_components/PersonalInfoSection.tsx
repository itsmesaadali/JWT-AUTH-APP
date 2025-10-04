"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { personalInfoSchema } from "@/lib/validation";
import { Spinner } from "@/components/ui/spinner";

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export function PersonalInfoSection({ user }: { user: { name: string } }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    reset,
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmit = async (data: PersonalInfoFormValues) => {
    try {
      await authClient.updateUser({
        name: data.name,
      });

      toast("Profile Updated", {
        description: "Your name has been updated successfully.",
      });

      reset({ name: data.name }); 
      router.refresh();
    } catch (error) {
      console.error("Failed to update name:", error);
      toast.error("Failed to Update Profile", {
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  disabled={isSubmitting}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <Button type="submit" disabled={!isDirty || isSubmitting}>
              {isSubmitting ? (
                <Spinner/>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
