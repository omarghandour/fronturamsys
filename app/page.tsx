import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Middle from "@/components/Middle";
const server: any = process.env.SERVER;
export default async function Home() {
  const auth = cookies().get("auth");
  const user = cookies().get("user");
  const route = user?.name !== "user" ? "/" : `/${user?.value}`;

  const { data } = await axios.get(
    `https://uramsys.onrender.com/tasks${route}`
  );

  if (auth?.name !== "auth" && user?.name !== "user") {
    redirect("/dashboard/login");
  }

  return (
    <main className="h-full mainBG flex flex-col justify-between items-center gap-3">
      <Navbar />
      <Middle />
      <Footer />
    </main>
  );
}
