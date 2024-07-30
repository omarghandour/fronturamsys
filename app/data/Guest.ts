"use server";
import { cookies } from "next/headers";

const SignAsGuest = async () => {
  const CreateCookie = cookies().set({
    name: "Guest",
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60,
    path: "/",
    sameSite: true,
    secure: true,
    value: "Guest",
  });
  return true;
};
export { SignAsGuest };
