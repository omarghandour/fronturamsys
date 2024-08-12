import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Middle from "@/components/Middle";
const server: any = process.env.SERVER;
export default async function Home() {
  const auth =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");

  if (!auth) {
    redirect("/settings/login");
  }

  return (
    <main className="h-[88%] w-full  flex flex-col justify-evenly items-center gap-3 backdrop-blur-2xl ">
      <Navbar />
      <Middle />
      {/* <Footer /> */}
    </main>
  );
}
