"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changePasswordSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import Loading from "../../../components/loading";

type PasswordFormData = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Invalid current Password");
      } else {
        toast.success("Your password has been updated successfully.");
      }
      form.reset();
    } catch (err: any) {
      toast.error("Failed to Update Password", {
        description: err.message || "Please try again.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Enter your current password and new password below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <Label htmlFor="current-password" className="mb-3">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              {...form.register("currentPassword")}
            />
            {form.formState.errors.currentPassword && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="new-password" className="mb-3">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              {...form.register("newPassword")}
            />
            {form.formState.errors.newPassword && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="confirm-password" className="mb-3">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loading />}
              {form.formState.isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
