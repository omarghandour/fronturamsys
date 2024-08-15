"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import attachment from "../public/attachment-2-svgrepo-com.svg";
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
import FImage from "./FImage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
type CardProps = React.ComponentProps<typeof Card>;
const FormSchema = z.object({
  image: z.any(),
});
const Task = ({ className, ...props }: CardProps) => {
  const [position, setPosition] = React.useState("bottom");
  const [task, setTask] = useState<any>();
  const [role, setRole] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      // alert("Please select a file first!");
      return;
    }

    const image = new FormData();
    await image.set("file", selectedFile);
    console.log(image);

    try {
      const response = await fetch(
        `https://uramsys.onrender.com/files/s/${id}`,
        {
          method: "POST",
          body: image,
        }
      );
      console.log(response);

      if (response?.ok) {
        location.replace("/");
      } else {
        alert("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // alert("An error occurred while uploading the file.");
    }
  };
  const Formile = async (id: string) => {
    const idd = await id;
    const file = await axios
      .post(`https://uramsys.onrender.com/files/s`, {
        task: idd,
      })
      .then(() => {
        location.replace("/");
      });
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
  // Function to delete the cached file when the task is deleted
  const deleteCache = (idd: string) => {
    localStorage.removeItem(`file_${idd}`);
  };
  const approved = async (id: any) => {
    const idd = await id;
    const Approve = await axios
      .delete(`https://uramsys.onrender.com/tasks/task/${idd}`)
      .then(() => {
        deleteCache(idd);
        location.replace("/");
      });
    const response = await axios.delete(
      `https://uramsys.onrender.com/files/s/${idd}`
    );
    console.log(response, Approve);
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
    <div className="h-[92%] w-full flex flex-col justify-start items-center mt-5 overflow-scroll">
      <Card
        className={cn("w-11/12 bg-white/60 text-white font-bold", className)}
        {...props}
      >
        <CardHeader>
          <CardTitle className="text-black">Tasks</CardTitle>
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
              <span className="flex h-2 w-2 translate-y-1 rounded-full " />
              <div className="space-y-1 overflow-scroll max-w-full flex flex-col gap-5 pb-5">
                <p className="text-sm font-medium leading-none text-black">
                  Title: {task?.data.task.title}
                </p>
                <p className="text-sm font-medium leading-none text-black">
                  Creator: {task?.data.task.creatorName}
                </p>
                <p className="text-sm font-medium leading-none text-black">
                  Assigned To: {task?.data.task.assignedToName}
                </p>
                <p className="text-sm font-medium leading-none text-black">
                  Deadline: {task?.data.task.deadlineDate.split("T")[0]}
                </p>
                <p className="text-sm font-medium leading-none">
                  Status: {task?.data.task.status}
                </p>
                <p className="text-sm text-muted-foreground max-w-full overflow-scroll break-words max-h-40">
                  <span className="text-md">Description: </span>
                  {task?.data.task.description}
                </p>
                <p className="text-sm text-muted-foreground max-w-full overflow-scroll break-words max-h-40">
                  <span className="text-md">Created At: </span>
                  {task?.data.task.createdAt.split("T")[0]}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full top-2">
              <Button className="w-full flex gap-5">
                <span>Attachment</span>
                <Image src={attachment} width={20} height={20} alt="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full p-5">
              <DropdownMenuLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="w-[200px]">
                    <Button className=" w-full">Attachment</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[90%] mx-auto p-5">
                    {/* <DropdownMenuLabel>nn</DropdownMenuLabel> */}
                    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                      <form onSubmit={handleUpload}>
                        <Label className="block text-sm font-medium text-gray-700">
                          Upload a file
                        </Label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e: any) =>
                            setSelectedFile(e.target.files[0])
                          }
                          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 cursor-pointer focus:outline-none"
                        />
                        <input
                          type="submit"
                          value={"Upload"}
                          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        />
                      </form>
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <FImage fileId={id} />
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
