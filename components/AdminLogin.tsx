"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SignupTeam } from "@/app/data/Signin";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const URI = process.env.URI;
console.log("Uri" + URI);
const AdminLogin = () => {
  const router = useRouter();
  const [dataa, setData] = useState<any>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    isPending,
    mutate: signup,
    data,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: SignupTeam,
    onError: (error) => console.log(error),
  });
  //   z.infer<typeof FormSchema>
  function onSubmit(data: any) {
    signup(data);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
  //
  // console.log(data?.message);

  if (data?.message) {
    toast({
      title: "Login Failed",
      description: data?.message,
    });
  }
  return (
    <div className=" w-full md:w-1/2 flex justify-center items-center text-white flex-col gap-5">
      <h1 className="font-bold text-3xl md:text-4xl">Log in to your account</h1>
      <p className="text-gray-400">Welcome back! Please enter your details.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    className="text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    className="text-black"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mainColor rounded-3xl p-7 w-full hover:text-black text-xl"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader /> : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdminLogin;
