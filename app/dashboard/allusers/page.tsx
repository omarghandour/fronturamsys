import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
const server: any = process.env.SERVER;

const page = async () => {
  const cookie =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  if (!cookie) {
    redirect("/dashboard/login");
  }

  const { data } = await axios.get(
    `https://uramsys.onrender.com/users/allUsers`
  );

  return (
    <div className="mainBG h-full flex gap-3 flex-col justify-center items-center">
      {data.map((user: any) => (
        <Link
          href={`/dashboard/allusers/${user._id}`}
          key={user._id}
          className="flex gap-5 bg-white w-full  p-2 justify-center hover:bg-slate-500 hover:text-white"
        >
          <div>{user.name}</div>
          <div>{user.role}</div>
          <div>{user.username}</div>
        </Link>
      ))}
    </div>
  );
};

export default page;
