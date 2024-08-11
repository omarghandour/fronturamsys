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
    <div className="backdrop-blur-lg  shadow-xl w-full h-full flex gap-3 flex-col justify-center items-center overflow-scroll mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-4/5 w-4/5 overflow-scroll">
        {data.map((user: any) => (
          <Link
            href={`/settings/addtask/${user._id}`}
            key={user._id}
            className="center flex-col gap-5 bg-white/75 backdrop-blur-md w-full  p-2  hover:bg-slate-500 hover:text-white shadow-xl"
          >
            <div className="font-bold text-xl">{user.name}</div>
            <div>
              <span>Role: </span>
              {user.role}
            </div>
            <div>@{user.username}</div>
          </Link>
        ))}
      </div>{" "}
    </div>
  );
};

export default page;
