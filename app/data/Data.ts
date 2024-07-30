"use server";
import axios from "axios";
import { cookies, headers } from "next/headers";
const server: any = process.env.SERVER;

const OneUser = async (ID: string) => {
  try {
    const { data } = await axios(
      `https://uramsys.onrender.com/users/oneUser/${ID}`
    );
    // console.log(data);

    return data;
  } catch (error: any) {
    // console.log(error);
    return error.message;
  }
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
