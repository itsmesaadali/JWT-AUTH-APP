"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { authClient } from "../../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

interface ProfilePictureSectionProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function ProfilePictureSection({ user }: ProfilePictureSectionProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    user.image ?? null
  );
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleProfilePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isUploading) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const newPic = reader.result as string;
      const tempPic = profilePicture;
      setProfilePicture(newPic);
      setIsUploading(true);

      try {
        await authClient.updateUser({
          image: newPic,
        });
        toast.success("Profile Picture Updated");
        router.refresh();
      } catch (error: any) {
        setProfilePicture(tempPic);
        toast.error(error.message || "Something went wrong.");
      } finally {
        setIsUploading(false);
      }

      // Reset input
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>Update your profile picture</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            {profilePicture ? (
              <AvatarImage src={profilePicture} alt={user.name} />
            ) : (
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {getInitials(user.name)}
              </AvatarFallback>
            )}
          </Avatar>

          <label
            htmlFor="profile-picture"
            className={`absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 transition-colors ${
              isUploading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-primary/90"
            }`}
          >
            {isUploading ? <Spinner /> : <Camera className="h-4 w-4" />}
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureUpload}
              disabled={isUploading}
            />
          </label>
        </div>
        <div>
          <p className="font-medium text-lg">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
