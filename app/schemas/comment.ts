import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const commentSchema = z.object({
    content: z.string().min(3, "Comment content must be at least 3 characters").max(1000, "Comment content cannot exceed 1000 characters"),
    postId: z.custom<Id<"posts">>()
})