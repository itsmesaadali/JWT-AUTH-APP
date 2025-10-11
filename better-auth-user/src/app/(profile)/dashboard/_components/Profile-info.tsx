"use client";

import React from "react";
import { TabsContent } from "../../../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, User } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { personalInfoSchema, changeEmailSchema } from "@/lib/validation";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LoadingSuspense } from "../../../../components/loading-suspense";

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
type EmailFormValues = z.infer<typeof changeEmailSchema>;

const ProfileInfo = ({ user }: { user: { name: string; email: string } }) => {
  const router = useRouter();

  // Name form
  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    formState: {
      isSubmitting: isSubmittingName,
      isDirty: isDirtyName,
      errors: errorsName,
    },
    reset: resetName,
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const onSubmitName = async (data: PersonalInfoFormValues) => {
    try {
      await authClient.updateUser({
        name: data.name,
      });

      toast.success("Your name has been updated successfully.");

      resetName({ name: data.name });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to Update Profile");
    }
  };

  // Email form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: {
      isSubmitting: isSubmittingEmail,
      isDirty: isDirtyEmail,
      errors: errorsEmail,
    },
    reset: resetEmail,
  } = useForm<EmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const onSubmitEmail = async (data: EmailFormValues) => {
    try {
      await authClient.changeEmail({
        newEmail: data.email,
        callbackURL: "/dashboard",
      });

      toast.success("Please verified the email.");

      resetEmail({ email: data.email });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to Update Email");
    }
  };

  return (
    <LoadingSuspense>
      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Update Name</CardTitle>
            <CardDescription>Change your display name</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              onSubmit={handleSubmitName(onSubmitName)}
              className="space-y-2"
            >
              <Label htmlFor="name">Full Name</Label>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 flex-1">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-9"
                      disabled={isSubmittingName}
                      {...registerName("name")}
                    />
                  </div>
                  {errorsName.name && (
                    <p className="text-sm text-red-500">
                      {errorsName.name.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={!isDirtyName || isSubmittingName}
                >
                  {isSubmittingName ? <Spinner /> : "Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Update Email</CardTitle>
            <CardDescription>Change your email address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form
              onSubmit={handleSubmitEmail(onSubmitEmail)}
              className="space-y-2"
            >
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1 flex-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-9"
                      disabled={isSubmittingEmail}
                      {...registerEmail("email")}
                    />
                  </div>
                  {errorsEmail.email && (
                    <p className="text-sm text-red-500">
                      {errorsEmail.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={!isDirtyEmail || isSubmittingEmail}
                >
                  {isSubmittingEmail ? <Spinner /> : "Update"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </LoadingSuspense>
  );
};

export default ProfileInfo;
