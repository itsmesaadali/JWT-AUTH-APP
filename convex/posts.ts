import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";

// Create a new task with the given text
export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStoreId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }
    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStoreId: args.imageStoreId,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl =
          post.imageStoreId !== undefined
            ? await ctx.storage.getUrl(post.imageStoreId)
            : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      })
    );
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostById = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }

    const resolvedImageUrl =
      post.imageStoreId !== undefined
        ? await ctx.storage.getUrl(post.imageStoreId)
        : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface searchResultType {
  _id: string;
  title: string;
  content: string;
}

export const searchPosts = query({
  args: { term: v.string(), limit: v.number() },
  handler: async (ctx, args) => {
    const limit = args.limit;

    const results:Array<searchResultType> = [];

    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<"posts">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) {
          continue;
        }

        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          content: doc.content,
        });

        if (results.length >= limit) {
          break;
        }
      }
    };
    const titleMatches = await ctx.db.query("posts").withSearchIndex("search_title", (q) =>q.search("title", args.term)).take(limit);
    
    await pushDocs(titleMatches);

    if (results.length < limit) {
      const contentMatches = await ctx.db.query("posts").withSearchIndex("search_content", (q) =>q.search("content", args.term)).take(limit);
      await pushDocs(contentMatches);
    }

    return results;;
  }
});
