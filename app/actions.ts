"use server";

import z from "zod";
import { BlogPostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath, updateTag } from "next/cache";

export async function createBlogAction(data: z.infer<typeof BlogPostSchema>) {

  try {

    const parsed = BlogPostSchema.safeParse(data);
    
    if (!parsed.success) {
      throw new Error("Invalid blog post data");
    }

    const token = await getToken();

  const imageUrl = await fetchMutation(
    api.posts.generateImageUploadUrl,
    {},
    { token }
  );

  const uploadResult = await fetch(imageUrl, {
    method: "POST",
    headers: { "Content-Type": parsed.data.image.type },
    body: parsed.data.image,
  });

  if (!uploadResult.ok) {
     return { error: "Image upload failed" };
  }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        content: parsed.data.content,
        imageStoreId: storageId,
      },
      { token }
    );


  } catch {
    return { error: "Failed to create blog post" }; 
  }


  updateTag("blog");
  return redirect("/blog");


}
