import Footer from "@/components/Footer";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
// const server: any = process.env.SERVER;

const page = async () => {
  const { data } = await axios.get(
    `https://uramsys.onrender.com/users/allUsers`
  );
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/settings/login");
  }

  return (
    <div className="mainBG w-full h-full flex gap-3 flex-col justify-center items-center overflow-scroll mx-auto">
      <div className="h-4/5 flex gap-5 flex-col mt-5">
        {data.map((user: any) => (
          <Link
            href={`/settings/addtask/${user._id}`}
            key={user._id}
            className="flex gap-5 bg-white w-full  p-2 justify-center hover:bg-slate-500 hover:text-white shadow-xl"
          >
            <div>{user.name}</div>
            <div>{user.role}</div>
            <div>{user.username}</div>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
};

export default page;
