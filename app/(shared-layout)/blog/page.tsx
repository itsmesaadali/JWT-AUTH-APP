import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { cacheTag } from "next/cache";


export const metadata:Metadata = {
  title:"My Blog",
  description:"Read the latest articles and insights on our blog.",
  category: "Web Development",
  authors: [{ name: "Saad Ali" }],
}

export default async function BlogPage() {

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h1 className="text-xl font-extrabold tracking-tight ">Our Blog</h1>
        <p className=" text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <LoadPosts />
      </Suspense>
    </div>
  );
}

async function LoadPosts() {


  "use cache";
  cacheLife("hours");
  cacheTag("blog");
  const data = await fetchQuery(api.posts.getPosts, {});

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((post) => (
        <Card key={post._id} className="pt-0">
          <div className="h-50 w-full overflow-hidden relative">
            <Image
              src={
                post.imageUrl ??
                "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="blog image"
              fill
              className="object-cover"
            />
          </div>
          <CardContent>
            <Link href={`/blog/${post._id}`}>
              <h1 className="text-sm font-bold hover:text-primary">
                {post.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{post.content}</p>
          </CardContent>

          <CardFooter>
            <Link
              className={buttonVariants({ className: "w-full" })}
              href={`/blog/${post._id}`}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  

}
