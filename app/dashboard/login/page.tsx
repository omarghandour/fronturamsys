"use server";
import Midleware from "@/components/midleware";
import AdminLogin from "../../../components/AdminLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const cookie = async () => {
  if (
    cookies().get("auth")?.name === "auth" ||
    cookies().get("user")?.name === "user"
  ) {
    return true;
  }
  return cookies().get("auth")?.name;
};
const page = async () => {
  const auth: any = await cookie();
  console.log(auth);

  if (auth) {
    redirect("/");
  }

  return (
    <main className="h-full">
      <Midleware />
    </main>
  );
};

export default page;
