import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Outbox from "@/components/Outbox";
export default async function Home() {
  const auth =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");

  if (!auth) {
    redirect("/settings/login");
  }

  return (
    <main className="h-full w-full backdrop-blur-lg  flex flex-col justify-between items-center gap-3">
      <Navbar />
      <Outbox />
      {/* <Footer /> */}
    </main>
  );
}
