import MiddleTask from "@/components/MiddleTask";
import Task from "@/components/Task";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="backdrop-blur-lg  center flex-col md:flex-row w-full h-full overflow-scroll ">
      <MiddleTask />
    </section>
  );
};

export default page;
