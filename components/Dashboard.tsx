import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="w-full h-full center flex-col">
      <Link href={"/"}>
        <Button>{"<---"}</Button>
      </Link>
      <div className=" w-[80%] md:w-1/2 h-1/2 backdrop-blur-lg bg-white/75 rounded-md grid grid-cols-2 content-around gap-5 p-5">
        <Link prefetch={true} href={"dashboard/adduser"}>
          <Button className="w-full">Add User</Button>
        </Link>
        <Link prefetch={true} href={"dashboard/allusers"}>
          <Button className="w-full">All Users</Button>
        </Link>
        <Link prefetch={true} href={"dashboard/addtask"}>
          <Button className="w-full">Add Task</Button>
        </Link>
        <Link prefetch={true} href={"dashboard/alltasks"}>
          <Button className="w-full">All Tasks</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
