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
import { useMutation } from "convex/react";
import z from "zod";
import { toast } from "sonner";
import { useTransition } from "react";
import { Spinner } from "../ui/spinner";

export function CommentSection() {
  const [isPending, startTransition] = useTransition();

  const createComment = useMutation(api.comments.createComment);
  const params = useParams();
  const postId = params.postId as Id<"posts">;

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    if (!postId) return toast.error("Post not found");

    startTransition(async () => {
      await createComment({
        content: values.content,
        postId,
      });
      toast.success("Comment created");
      form.reset({ content: "" });
    });
  }

  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b pb-4">
        <MessageSquare className="size-3" />
        <h2 className="font-bold">5 Comments</h2>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
