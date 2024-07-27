import axios from "axios";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { data } = await axios.get("http://localhost:3000/users/allUsers");

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
