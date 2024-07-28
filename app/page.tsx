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
const server: any = process.env.SERVER;
export default async function Home() {
  const auth = cookies().get("auth");
  const user = cookies().get("user");
  const route = user?.name !== "user" ? "/" : `/${user?.value}`;

  const { data } = await axios.get(`http://localhost:3000/tasks${route}`);

  if (auth?.name !== "auth" && user?.name !== "user") {
    redirect("/dashboard/login");
  }
  const dd = async () => {
    "use server";
    cookies().delete("auth");
    cookies().delete("user");
    redirect("/dashboard/login");
  };
  return (
    <main className="h-full bg-black p-2 w-full flex flex-col items-center gap-10">
      <nav className="flex gap-5 justify-center p-3 bg-white w-fit mx-auto rounded-lg">
        <form action={dd}>
          <Button>Logout</Button>
        </form>

        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </nav>
      <div className="bg-white w-[95%] rounded-lg p-2">
        <Table>
          <TableCaption>A list of your recent Tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>AssignedTo</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((task: any) => (
              <TableRow key={task._id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.creatorName}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.assignedToName}</TableCell>

                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right ">{data.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
}
