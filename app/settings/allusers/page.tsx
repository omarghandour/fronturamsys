import { Button } from "@/components/ui/button";
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
    redirect("/settings/login");
  }

  const { data } = await axios.get(
    `https://uramsys.onrender.com/users/allUsers`
  );

  return (
    <div className="backdrop-blur-xl  h-full w-full overflow-scroll center flex flex-col gap-5 ubuntu-regular">
      <Link href={"/settings"}>
        <Button className="bg-white text-black">{"<---"}</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-4/5 w-4/5 overflow-scroll">
        {data.map((user: any) => (
          <Link
            href={`/settings/allusers/${user._id}`}
            key={user._id}
            className="gap-5 bg-white/75 backdrop-blur-md w-full flex-col center rounded-lg p-2  hover:bg-slate-500 hover:text-white"
          >
            <div className="font-bold text-xl">{user.name}</div>
            <div>
              <span>Role: </span>
              {user.role}
            </div>
            <div>@{user.username}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
