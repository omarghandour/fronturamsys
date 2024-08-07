"use server";
import Dashboard from "@/components/Dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookie = cookies().get("manager") || cookies().get("admin");
  if (!cookie) {
    redirect("/settings/login");
  }

  return (
    <main className="mainBG h-full center w-full">
      <Dashboard />
    </main>
  );
};

export default page;
