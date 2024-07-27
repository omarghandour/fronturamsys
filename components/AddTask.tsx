"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { cookie } from "@/app/data/Data";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string(),
  deadlineDate: z.string(),
});
type Data = {
  title: string;
  description: string;
  deadlineDate: string;
};
const server: any = process.env.SERVER;

// const TaskManage = async (data: Data) => {
//   const [taskk, setTask] = useState();
//   const task = async () => {
//     const tt: any = await cookie();
//     setTask(tt);
//   };
//   // console.log(server);
//   // https://uramsys.onrender.com
//   const team = await axios
//     .post(
//       `http://localhost:3001/tasks/create/`,
//       {
//         title: data.title,
//         description: data.description,
//         deadlineDate: data.deadlineDate,
//         creator: "",
//       },
//       {
//         withCredentials: true,
//       }
//     )
//     .then(function (response) {
//       return response;
//     })
//     .catch((error) => {
//       return {
//         message: error.response.data,
//       };
//     });
//   return team;
// };
const AddTask = () => {
  const [taskk, setTask] = useState<any>();
  const path = usePathname().split("/")[3];

  const task = async () => {
    const tt: any = await cookie();
    setTask(tt);
  };
  const router = useRouter();
  const TaskManage = async (data: Data) => {
    const team = await axios
      .post(
        `${server}/tasks/create/${path}`,
        {
          title: data.title,
          description: data.description,
          deadlineDate: data.deadlineDate,
          assignedTo: taskk.coo.value,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        return response;
      })
      .catch((error) => {
        return {
          message: error.response.data,
        };
      });
    return team;
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      deadlineDate: "",
    },
  });
  useEffect(() => {
    task();
  }, []);

  // tanstack
  const {
    isPending,
    mutate: signup,
    data,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: TaskManage,
    onError: () =>
      toast({
        title: "Error",
        description: "Failed to sign up. Please try again later.",
      }),
  });
  console.log(data);
  //   z.infer<typeof FormSchema>
  function onSubmit(data: any) {
    signup(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  if (data) {
    router.push("/dashboard");
  }
  return (
    <div className="w-full flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadlineDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DeadlineDate</FormLabel>
                <FormControl>
                  <Input placeholder="deadlineDate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTask;
