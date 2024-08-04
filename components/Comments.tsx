"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "next/navigation";
import { checkCookie } from "@/app/data/CookieCheck";
import { useEffect, useState } from "react";
const formSchema = z.object({
  comment: z.string().min(2).max(50),
});
const Comments = () => {
  const taskID = useParams();
  const [userID, setUserID] = useState<any>();
  const [comments, setComments] = useState<any>();
  const ff = async () => {
    const coo: any = await checkCookie();
    setUserID(coo);
  };
  useEffect(() => {
    ff();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const addComment = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios
        .post(
          `https://uramsys.onrender.com/tasks/addComment/${taskID?.id}/${userID?.value}`,
          {
            content: data.comment,
          }
        )
        .then(() => location.reload());
    } catch (error) {
      console.error(error);
    }
    form.reset();
  };
  const getComments = async () => {
    try {
      const data = await axios.get(
        `https://uramsys.onrender.com/tasks/comment/${taskID?.id}`
      );
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  function onSubmit(data: z.infer<typeof formSchema>) {
    addComment(data);
  }
  useEffect(() => {
    getComments();
  }, []);

  return (
    <section className="backdrop-blur-lg bg-white/50 w-full h-1/3 shadow-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex  items-end justify-center mb-2"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add comment</FormLabel>
                <FormControl>
                  <Input placeholder="Your comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="flex flex-col gap-3 overflow-scroll h-3/5">
        {comments?.data?.comments.map((comment: any) => (
          <div key={comment?.id} className="backdrop-blur-lg bg-white/80 p-3">
            <p>{comment?.content}</p>
            <p className="text-gray-600 text-sm">By: {comment?.uName}</p>
          </div>
        ))}
        {comments?.data?.comments.length === 0 && <p>No comments yet</p>}
      </div>
    </section>
  );
};

export default Comments;