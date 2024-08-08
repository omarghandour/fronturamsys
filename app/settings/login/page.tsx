"use server";
import Midleware from "@/components/midleware";
import AdminLogin from "../../../components/AdminLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const cookie = async () => {
  if (
    cookies().get("manager")?.name === "manager" ||
    cookies().get("user")?.name === "user" ||
    cookies().get("admin")?.name === "admin"
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
    <main className="h-full w-full bg-[url('../public/assets/Rainbow_lightbulb_by_Daniel_Micallef.png')] bg-cover">
      <Midleware />
    </main>
  );
};

export default page;
