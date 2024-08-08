import CreateUser from "@/components/CreateUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/settings/login");
  }

  return (
    <div className="backdrop-blur-lg text-white h-full center w-full">
      <CreateUser />
    </div>
  );
};

export default page;
