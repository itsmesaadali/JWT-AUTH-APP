"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/components/ui/spinner";

const DeleteAccount = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      toast.info("Invalid Confirmation", {
        description: 'Please type "DELETE" to confirm account deletion.',
      });
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.deleteUser();

      if (error) {
        toast.error(error.message || "Failed to delete account.");
      } else {
        window.location.href = "/auth/login";
      }
    } catch (err: any) {
      toast.error("Failed to Delete Account", {
        description: err.message || "Please try again.",
      });
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setDeleteConfirmation("");
    }
  };

  return (
    <>
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </div>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <div>
              <h3 className="font-semibold text-balance mb-1">
                Delete Account
              </h3>
              <p className="text-sm text-muted-foreground text-pretty">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              This action is permanent and cannot be undone. All your data will
              be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">
                This will permanently delete:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Your profile and account information</li>
                <li>All your personal data</li>
                <li>Your active sessions</li>
                <li>Any associated content</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delete-confirmation">
                Type <span className="font-bold">DELETE</span> to confirm
              </Label>
              <Input
                id="delete-confirmation"
                placeholder="DELETE"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeleteConfirmation("");
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== "DELETE" || loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  Deleting...
                </>
              ) : (
                "Delete Account Permanently"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteAccount;
