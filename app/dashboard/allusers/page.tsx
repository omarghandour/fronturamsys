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

  const { data } = await axios.get(`${server}/users/allUsers`);

  return (
    <div className="bg-black h-full flex gap-3 flex-col justify-center items-center">
      {data.map((user: any) => (
        <Link
          href={`/dashboard/allusers/${user._id}`}
          key={user._id}
          className="flex gap-5 bg-white w-[30%] justify-center rounded-md"
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
