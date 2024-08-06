import CreateUser from "@/components/CreateUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/dashboard/login");
  }

  return (
    <div className="mainBG h-full center">
      <CreateUser />
    </div>
  );
};

export default page;
