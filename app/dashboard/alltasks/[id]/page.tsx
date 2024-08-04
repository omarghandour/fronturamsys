import Comments from "@/components/Comments";
import Task from "@/components/Task";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="mainBG overflow-hidden center flex-col w-full h-[100svh]">
      <Link href={"/dashboard/alltasks"} className="mt-2">
        <Button className="">{"<---"}</Button>
      </Link>
      <Task />
      <Comments />
    </section>
  );
};

export default page;
