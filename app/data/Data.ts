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
export { OneUser, cookie };
