"use client";

import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/app/schemas/comment";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Spinner } from "../ui/spinner";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";

export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsbyBlog>;
}) {
  const params = useParams<{ postId: Id<"posts"> }>();

  const data = usePreloadedQuery(props.preloadedComments);

  const [isPending, startTransition] = useTransition();

  const createComment = useMutation(api.comments.createComment);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      postId: params.postId,
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await createComment(values);
        form.reset();
        toast.success("Comment created");
      } catch (error) {
        toast.error("Failed to create comment");
      }
    });
  }

  if (data === undefined) {
    return <Spinner />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b pb-4">
        <MessageSquare className="size-3" />
        <h2 className="font-bold">
          {data.length === 0 ? "No Comments" : `${data.length} Comments`}
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Comment</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Write your comment here..."
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Creating comment...
              </>
            ) : (
              "Create Comment"
            )}
          </Button>
        </form>

        {data?.length > 0 && <Separator />}

        <div
          className={
            data.length > 2
              ? "max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
              : ""
          }
        >
          <section className="space-y-6">
            {data.map((comment) => (
              <div key={comment._id} className="flex gap-4">
                <Avatar className="size-5 shrink-0">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                      {comment.authorName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(comment._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
