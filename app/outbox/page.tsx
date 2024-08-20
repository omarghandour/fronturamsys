import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Outbox from "@/components/Outbox";
export default async function Home() {
  const auth =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  console.log(auth?.name);

  if (!auth) redirect("/settings/login");

  if (auth.name === "user") redirect("/");
  return (
    <main className="h-[88%] w-full  flex flex-col justify-evenly items-center gap-3 backdrop-blur-2xl">
      <Navbar />
      <Outbox />
      {/* <Footer /> */}
    </main>
  );
}
