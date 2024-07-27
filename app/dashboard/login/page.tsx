"use server";
import AdminLogin from "../../../components/AdminLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
const cookie = async () => {
  return cookies().get("auth")?.name;
};
const page = async () => {
  const auth: any = await cookie();

  if (auth === "auth" || auth === "user") {
    redirect("/");
  }

  return (
    <main className="bg-black h-full flex justify-center items-center">
      <AdminLogin />
    </main>
  );
};

export default page;
