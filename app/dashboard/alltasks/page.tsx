import Middle from "@/components/Middle";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
const server: any = process.env.SERVER;

const page = async () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/dashboard/login");
  }

  const { data } = await axios.get(`https://uramsys.onrender.com/tasks`);

  return (
    <div className="mainBG h-full flex gap-3 flex-col justify-center items-center">
      <Link href={"/dashboard"}>
        <Button>{"<---"}</Button>
      </Link>
      <Middle />
    </div>
  );
};

export default page;
