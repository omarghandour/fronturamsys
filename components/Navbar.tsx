import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { redirect } from "next/navigation";
import { checkCookie } from "@/app/data/CookieCheck";
import { cookies } from "next/headers";
import { OneUser } from "@/app/data/Data";

const Navbar = async () => {
  const logout = async () => {
    "use server";
    cookies().delete("admin");
    cookies().delete("manager");
    cookies().delete("user");
    redirect("/settings/login");
  };
  const team = await checkCookie();
  if (!team) {
    redirect("/settings/login");
  }
  const id = team.value;
  const data = await OneUser(id);
  const name = data?.user?.name;
  return (
    <div className=" sticky top-0 z-50 bg-white w-full shadow-md">
      <div className="flex justify-between flex-row gap-5 m-5 items-center">
        <Link href={"/"}>
          <Avatar>
            <AvatarImage src={"Pic.team.profilePic"} alt="Profile Pic" />
            <AvatarFallback>{name ? name[0] : ""}</AvatarFallback>
          </Avatar>
        </Link>
        <Link href={"/"}>{`Welcome ${name}`}</Link>
        <form action={logout}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
