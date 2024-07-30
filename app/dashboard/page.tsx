"use server";
import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const cookie = cookies().get("auth");
  if (cookie?.name !== "auth") {
    redirect("/dashboard/login");
  }

  return (
    <main className="mainBG h-full center ">
      <Dashboard />
    </main>
  );
};

export default page;
