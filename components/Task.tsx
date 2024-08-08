"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { redirect, useParams } from "next/navigation";
import axios from "axios";
import { Button } from "./ui/button";
import { CheckIcon } from "lucide-react";
import { cookie } from "@/app/data/Data";
import Comments from "./Comments";

type CardProps = React.ComponentProps<typeof Card>;

const Task = ({ className, ...props }: CardProps) => {
  const [position, setPosition] = React.useState("bottom");
  const [task, setTask] = useState<any>();
  const [role, setRole] = useState<any>();
  const { id }: any = useParams();
  const rr = async () => {
    const rolee: any = await cookie();
    setRole(rolee);
  };

  const getTask = async (id: string) => {
    const data = await axios.get(
      `https://uramsys.onrender.com/tasks/task/${id}`
    );
    // console.log(data);
    setTask(data);
  };
  const status = async (id: any) => {
    const idd = await id;
    const Status = await axios
      .patch(`https://uramsys.onrender.com/tasks/task/${idd}`)
      .then(() => {
        location.replace("/");
      });
  };
  const reject = async (id: any) => {
    const idd = await id;
    const Reject = await axios
      .patch(`https://uramsys.onrender.com/tasks/task/reject/${idd}`)
      .then(() => {
        location.replace("/");
      });
    console.log(Reject);
  };
  const approved = async (id: any) => {
    const idd = await id;
    const Approve = await axios
      .delete(`https://uramsys.onrender.com/tasks/task/${idd}`)
      .then(() => {
        location.replace("/");
      });
    console.log(Approve);
  };
  const Reject = async () => {
    reject(id);
  };
  const Approve = async () => {
    approved(id);
  };
  const forrm = async () => {
    status(id);
  };
  const creator: any = task?.data.task.creator;
  useEffect(() => {
    getTask(id);
    rr();
  }, [id]);
  return (
    <div className="h-full w-full flex flex-col justify-start items-center mt-5 overflow-scroll">
      <Card
        className={cn("w-11/12 bg-white/60 text-white font-bold", className)}
        {...props}
      >
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
          </div> */}
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1 overflow-scroll max-w-full flex flex-col gap-5 pb-5">
                <p className="text-sm font-medium leading-none">
                  Title: {task?.data.task.title}
                </p>
                <p className="text-sm font-medium leading-none">
                  Creator: {task?.data.task.creatorName}
                </p>
                <p className="text-sm font-medium leading-none">
                  Assigned To: {task?.data.task.assignedToName}
                </p>
                <p className="text-sm font-medium leading-none">
                  Deadline: {task?.data.task.deadlineDate.split("T")[0]}
                </p>
                <p className="text-sm font-medium leading-none">
                  Status: {task?.data.task.status}
                </p>
                <p className="text-sm text-muted-foreground max-w-full overflow-scroll break-words max-h-40">
                  <span className="text-md">Description:</span>
                  {task?.data.task.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=" w-full">Click for actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup className="w-full">
                <DropdownMenuRadioItem value="top">
                  <form action={forrm} method="post" className="w-full">
                    <Button type="submit" className="w-full">
                      <CheckIcon className="mr-2 h-4 w-4" /> Mark all as Done
                    </Button>
                  </form>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  <form
                    action={Reject}
                    method="post"
                    className={`w-full ${
                      role?.coo.name !== "user" ? "" : "hidden"
                    }`}
                  >
                    <Button type="submit" className="w-full bg-red-900">
                      X Reject
                    </Button>
                  </form>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  <form
                    method="post"
                    action={Approve}
                    className={`w-full ${
                      role?.coo.name !== "user" ? "" : "hidden"
                    }`}
                  >
                    <Button type="submit" className="w-full bg-green-900">
                      <CheckIcon className="mr-2 h-4 w-4" /> Approve
                    </Button>
                  </form>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Comments />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Task;
{
  /* <Card
        className={cn("w-full backdrop-blur-md bg-white/70 h-full md:w-2/3")}
      >
        <h1 className="text-left pl-6 text-black text-xl mt-2 shadow-sm">
          Task
        </h1>
        <CardContent className="grid gap-4 md:flex md:justify-center w-full h-[90%]"></CardContent>
      </Card> */
}
