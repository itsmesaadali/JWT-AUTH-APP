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
import { changeEmailSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";

type EmailFormData = z.infer<typeof changeEmailSchema>;

export function ChangeEmailForm() {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      const { error } = await authClient.changeEmail({
        newEmail: data.email,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || "Please try again.");
      } else {
        toast.success(
          "A verification email has been sent. Please check your inbox."
        );
      }
      form.reset();
    } catch (err: any) {
      toast.error("Failed to Initiate Email Change", {
        description: err.message || "Please try again.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Email Address</DialogTitle>
          <DialogDescription>
            Enter your new email address below. A verification email will be
            sent.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <Label htmlFor="new-email" className="mb-3">
              New Email Address
            </Label>
            <Input
              id="new-email"
              type="email"
              placeholder="Enter new email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                <Spinner/>
              )}
              {form.formState.isSubmitting ? "Sending..." : "Send Verification"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
