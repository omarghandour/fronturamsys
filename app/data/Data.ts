"use server";
import axios from "axios";
import { cookies, headers } from "next/headers";

const OneUser = async (ID: string) => {
  const res = await axios(`http://localhost:3000/users/getuser/${ID}`);
  return res.data;
};
const cookie = async () => {
  const coo = cookies().get("auth");
  return { coo };
};
export { OneUser, cookie };
