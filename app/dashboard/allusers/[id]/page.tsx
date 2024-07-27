"use server";
import axios from "axios";
import React from "react";
import { headers } from "next/headers";
import OneUser from "@/components/OneUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = async () => {
  return (
    <div className="bg-black h-full center flex-col">
      <Link href={"/dashboard/allusers"}>
        <Button>{"<---"}</Button>
      </Link>
      <OneUser />
    </div>
  );
};

export default page;
