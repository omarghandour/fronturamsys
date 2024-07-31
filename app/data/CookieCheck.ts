import { cookies } from "next/headers";

const checkCookie = async () => {
  const auth = cookies().get("user");
  const admin = cookies().get("admin");
  const manager = cookies().get("manager");

  if (admin) {
    return admin;
  }
  if (auth) {
    return auth;
  }
  if (manager) {
    return manager;
  }
};
export { checkCookie };
