import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";

interface BlogIdPageProps {
  params: Promise<{ blogId: Id<"posts"> }>;
}

export default async function BlogIdPage({ params }: BlogIdPageProps) {
  const { blogId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: blogId });
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
        <Link href={"/blog"} className={buttonVariants({ variant: "ghost", className: "mb-4" })}>
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
        <h1 className="text-2xl font-bold mt-4">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link href={"/blog"} className={buttonVariants({ variant: "ghost", className: "mb-4" })}>
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>

      <div className="relative w-full h-100 mb-8 overflow-hidden xl shadow-sm">
        <Image
          src={
            post.imageUrl ??
            "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="space -y-4 flex flex-col">
        <h1 className="text-xl font-bold mb-4 tracking-tight">{post.title}</h1>
        <p className="text-muted-foreground text-sm">Posted on: {new Date(post._creationTime).toLocaleDateString()}</p>
      </div>
      <Separator className="my-4"/>
        <p className="text-lg leading-relaxed text-foreground/90">
          {post.content}
        </p>
    </div>
  );
}
