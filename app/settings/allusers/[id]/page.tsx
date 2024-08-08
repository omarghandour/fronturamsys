"use server";
import React from "react";
import { cookies } from "next/headers";
import OneUser from "@/components/OneUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const page = async () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/settings/login");
  }

  return (
    <div className="mainBG w-full h-full center flex-col">
      <OneUser />
    </div>
  );
};

export default page;
