import React from "react";
import OneUser from "@/components/OneUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/settings/login");
  }

  return (
    <div className=" h-full center flex-col mx-auto">
      <OneUser />
    </div>
  );
};

export default page;
