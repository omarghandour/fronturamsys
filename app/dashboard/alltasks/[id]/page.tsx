import Task from "@/components/Task";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="mainBG overflow-hidden center flex-col w-full h-[100svh]">
      <Link href={"/dashboard/alltasks"}>
        <Button>{"<---"}</Button>
      </Link>
      <Task />
    </section>
  );
};

export default page;
