"use server";
import axios from "axios";
import { cookies } from "next/headers";
type Data = {
  username: string;
  password: string;
};
const SignupTeam = async (data: Data) => {
  const team: any = await axios
    .post(
      `https://uramsys.onrender.com/users/login`,
      {
        username: data.username,
        password: data.password,
      },
      {
        withCredentials: true,
      }
    )
    .then(function (response) {
      const ff = response.data.JWTtoken;
      const role = response.data.user.role;
      console.log(role);

      cookies().set(role, ff.auth ? ff.auth : ff.userr, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      return response;
    })
    .catch((error) => {
      return {
        message: error.response.data,
      };
    });

  return team;
};
export { SignupTeam };
