"use server";

import z from "zod";
import { BlogPostSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export async function createBlogAction(data: z.infer<typeof BlogPostSchema>) {
  const parsed = BlogPostSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid blog post data");
  }

  const token = await getToken();

  await fetchMutation(
    api.posts.createPost, {
      title: parsed.data.title,
      content: parsed.data.content,
    }, {token}
  )

  return redirect("/");
}
