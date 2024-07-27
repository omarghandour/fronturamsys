import CreateUser from "@/components/CreateUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const cookie = cookies().get("auth");
  if (cookie?.name !== "auth") {
    redirect("/dashboard/login");
  }

  return (
    <div className="bg-black h-full center">
      <CreateUser />
    </div>
  );
};

export default page;
