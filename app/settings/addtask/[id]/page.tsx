import React from "react";
import OneUser from "@/components/OneUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/settings/login");
  }

  return (
    <div className=" h-full center flex-col mx-auto">
      <Link href={"/settings/addtask"}>
        <Button className="bg-white text-black">{"<--"}</Button>
      </Link>
      <OneUser />
    </div>
  );
};

export default page;
