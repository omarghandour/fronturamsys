import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="w-full h-full center flex-col">
      <div className=" w-[80%] md:w-1/2 h-1/2 backdrop-blur-lg bg-white/75 shadow-xl rounded-md grid grid-cols-2 content-around gap-5 p-5">
        <Link prefetch={true} href={"settings/adduser"}>
          <Button className="w-full mainColor">Add User</Button>
        </Link>
        <Link prefetch={true} href={"settings/allusers"}>
          <Button className="w-full mainColor">All Users</Button>
        </Link>
        <Link prefetch={true} href={"settings/addtask"}>
          <Button className="w-full mainColor">Add Task</Button>
        </Link>
        <Link prefetch={true} href={"settings/alltasks"}>
          <Button className="w-full mainColor">All Tasks</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
