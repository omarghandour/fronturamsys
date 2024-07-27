import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const cookie = cookies().get("auth");
  if (cookie?.name !== "auth") {
    redirect("/dashboard/login");
  }

  return (
    <div className="bg-black h-full center flex-col">
      <Link href={"/dashboard"}>
        <Button>{"<---"}</Button>
      </Link>
    </div>
  );
};

export default page;
