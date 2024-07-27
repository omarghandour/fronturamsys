import { Button } from "@/components/ui/button";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
const server: any = process.env.SERVER;

const page = async () => {
  const cookie = cookies().get("auth");
  if (cookie?.name !== "auth") {
    redirect("/dashboard/login");
  }

  const { data } = await axios.get(`${server}/tasks`);

  return (
    <div className="bg-black h-full flex gap-3 flex-col justify-center items-center">
      <Link href={"/dashboard"}>
        <Button>{"<---"}</Button>
      </Link>
      <div className="w-fit text-left bg-white p-5 rounded-lg gap-5 flex flex-col">
        <div className="flex    justify-between p-2">
          <div>Title</div>
          <div>Description</div>
          <div>Deadline</div>
          <div>AssignedTo</div>
          <div>Status</div>
          <div>Creator</div>
        </div>
        {data.map((task: any) => (
          <Link
            href={`/dashboard/alltasks/${task._id}`}
            key={task._id}
            className="flex   gap-6 justify-start p-2"
          >
            <div>{task.title}</div>
            <div>{task.description}</div>
            <div>{task.deadlineDate}</div>
            <div>{task.assignedToName}</div>
            <div>{task.status}</div>
            <div>{task.creatorName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
