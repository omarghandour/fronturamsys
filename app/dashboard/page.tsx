"use server";
import Dashboard from "@/components/Dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookie = cookies().get("auth");
  if (cookie?.name !== "auth") {
    redirect("/dashboard/login");
  }

  return (
    <main className="mainBG h-full flex justify-center items-center">
      <Dashboard />
    </main>
  );
};

export default page;
