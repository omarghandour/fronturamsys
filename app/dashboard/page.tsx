import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie || cookie.name === "user") {
    redirect("/");
  }
  return (
    <div className="h-full backdrop-blur-lg w-full text-white center mx-auto">
      <div>coming soon</div>
    </div>
  );
};

export default page;
