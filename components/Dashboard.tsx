import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/2 h-1/2 bg-white rounded-md grid grid-cols-2 content-around gap-5 p-5">
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
