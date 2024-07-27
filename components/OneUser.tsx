"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AddTask from "./AddTask";
const OneUser = () => {
  const [user, setUser] = useState<any>();
  const server: any = process.env.SERVER;
  const GetUser = async (ID: any) => {
    const response = await axios.get(`${server}/users/getuser/${ID}`);
    const data = await response.data;
    setUser(data);
    return data;
  };

  const path = usePathname();
  if (path.includes("addtask")) {
  }
  const ID = path.split("/")[3];
  useEffect(() => {
    GetUser(ID);
  }, [ID]);
  //   const data = GetUser(ID);
  const AddTaskk = () => {
    return (
      <>
        <AddTask />
      </>
    );
  };
  return (
    <div className="flex flex-col gap-5 bg-white p-5 rounded-lg">
      {path.includes("addtask") ? (
        <AddTaskk />
      ) : (
        <div className="flex flex-col gap-5 p-5">
          <h1>name: {user?.user.name}</h1>
          <h2>Role: {user?.user.role}</h2>
          <h3>Username: {user?.user.username}</h3>
          <h3>Email: {user?.user.email}</h3>
        </div>
      )}
    </div>
  );
};

export default OneUser;
