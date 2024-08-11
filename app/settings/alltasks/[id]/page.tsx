import Task from "@/components/Task";
import React from "react";

const page = () => {
  return (
    <section className="backdrop-blur-lg  center flex-col w-full h-[110svh] overflow-scroll ">
      <Task />
    </section>
  );
};

export default page;
