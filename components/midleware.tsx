import { cookies } from "next/headers";
import React from "react";
import AdminLogin from "./AdminLogin";

export const cookie = async (data: any) => {
  if (data.jar.auth) {
    cookies().set({
      name: "auth",
      httpOnly: data.jar.auth.httpOnly,
      maxAge: data.jar.auth.maxAge,
      path: data.jar.auth.path,
      sameSite: data.jar.auth.sameSite,
      secure: data.jar.auth.secure,
      value: data.jar.auth.value,
    });
  }
  if (data.jar.admin) {
    cookies().set({
      name: "admin",
      httpOnly: data.jar.admin.httpOnly,
      maxAge: data.jar.admin.maxAge,
      path: data.jar.admin.path,
      sameSite: data.jar.admin.sameSite,
      secure: data.jar.admin.secure,
      value: data.jar.admin.value,
    });
  }
};
const Midleware = () => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center backdrop-blur-lg">
      <AdminLogin />
    </div>
  );
};

export default Midleware;
