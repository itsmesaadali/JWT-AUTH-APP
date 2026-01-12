import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { Metadata } from "next";
import { PostPresence } from "@/components/web/PostPresence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface BlogIdPageProps {
  params: Promise<{ blogId: Id<"posts"> }>;
}
export async function generateMetadata({params} : BlogIdPageProps): Promise<Metadata> {
  const {blogId} = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId: blogId });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 60), // First 60 characters as description
    authors: [{ name: post.authorId }],
    category: "Web Development",
  };
}


export default async function BlogIdPage({ params }: BlogIdPageProps) {
  const { blogId } = await params;

  const token = await getToken();

  const [post, preloadedComments, userId] = await Promise.all([
    fetchQuery(api.posts.getPostById, { postId: blogId }),
    preloadQuery(api.comments.getCommentsbyBlog, { postId: blogId }),
    fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if(!userId) { 
    return redirect('/auth/login');
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
        <Link
          href={"/blog"}
          className={buttonVariants({ variant: "ghost", className: "mb-4" })}
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
        <h1 className="text-2xl font-bold mt-4">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link
        href={"/blog"}
        className={buttonVariants({ variant: "ghost", className: "mb-4" })}
      >
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
          <div className="flex items-center gap-2">
             <p className="text-muted-foreground text-sm">
          Posted on: {new Date(post._creationTime).toLocaleDateString()}
        </p>
        { userId && <PostPresence roomId={post._id} userId={userId} />}
          </div>
      </div>
      <Separator className="my-4" />
      <p className="text-lg leading-relaxed text-foreground/90">
        {post.content}
      </p>
      <Separator className="my-4" />

      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
