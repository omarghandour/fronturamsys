import { cookies } from "next/headers";

const checkCookie = async () => {
  const auth = cookies().get("auth");
  const admin = cookies().get("user");

  if (admin) {
    return admin;
  }
  if (auth) {
    return auth;
  }
};
export { checkCookie };
