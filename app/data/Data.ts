"use server";
import axios from "axios";
import { cookies, headers } from "next/headers";
const server: any = process.env.SERVER;

const OneUser = async (ID: string) => {
  const res = await axios(`https://uramsys.onrender.com/users/getuser/${ID}`);
  return res.data;
};
const cookie = async () => {
  const coo = cookies().get("auth");
  return { coo };
};
const createCookies = async (data: any) => {
  console.log(data);

  // cookies().set(token, token, {
  //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  // });
};
export { OneUser, cookie, createCookies };
