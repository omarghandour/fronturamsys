import React from "react";
import OneUser from "@/components/OneUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async () => {
  return (
    <div className="bg-black h-full center flex-col">
      <Link href={"/dashboard/addtask"}>
        <Button>{"<---"}</Button>
      </Link>
      <OneUser />
    </div>
  );
};

export default page;
