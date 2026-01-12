"use server";

import z from "zod";
import { BlogPostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export async function createBlogAction(data: z.infer<typeof BlogPostSchema>) {
  const parsed = BlogPostSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid blog post data" };
  }

  const token = await getToken();

  // 1️⃣ Upload image
  const uploadUrl = await fetchMutation(
    api.posts.generateImageUploadUrl,
    {},
    { token }
  );

  const uploadResult = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": parsed.data.image.type },
    body: parsed.data.image,
  });

  if (!uploadResult.ok) {
    return { success: false, error: "Image upload failed" };
  }

  const { storageId } = await uploadResult.json();

  // 2️⃣ Create post
  await fetchMutation(
    api.posts.createPost,
    {
      title: parsed.data.title,
      content: parsed.data.content,
      imageStoreId: storageId,
    },
    { token }
  );

  // 3️⃣ Redirect — last line
  redirect("/blog");
}
