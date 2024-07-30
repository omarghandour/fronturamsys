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
    cookies().delete("auth");
    cookies().delete("user");
    redirect("/dashboard/login");
  };
  const team = await checkCookie();
  if (!team) {
    redirect("/login");
  }
  const id = team.value;
  const data = await OneUser(id);
  const name = data.user.name;

  return (
    <div className=" sticky top-0 z-50 bg-white w-full shadow-md">
      <div className="flex justify-between flex-row gap-5 m-5 items-center">
        <Link href={"/"}>
          <Avatar>
            <AvatarImage src={"Pic.team.profilePic"} alt="Profile Pic" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <Link href={"/"}>{name}</Link>
        <form
          action={async () => {
            "use server";
            logout();
            redirect("/dashboard/login");
          }}
        >
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
