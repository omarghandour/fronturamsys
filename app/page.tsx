import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Middle from "@/components/Middle";
import bg from "../public/assets/Rainbow_lightbulb_by_Daniel_Micallef.png";
const server: any = process.env.SERVER;
export default async function Home() {
  const auth =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");

  if (!auth) {
    redirect("/settings/login");
  }

  return (
    <main className="h-full w-full  flex flex-col justify-evenly items-center gap-3 backdrop-blur-2xl">
      <Navbar />
      <Middle />
      {/* <Footer /> */}
    </main>
  );
}
