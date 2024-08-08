import Middle from "@/components/Middle";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
// const server: any = process.env.SERVER;

const page = async () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/settings/login");
  }

  // const { data } = await axios.get(`https://uramsys.onrender.com/tasks`);

  return (
    <div className="backdrop-blur-lg  w-full flex gap-3 flex-col justify-center items-center h-[150svh]">
      <Middle />
    </div>
  );
};

export default page;
