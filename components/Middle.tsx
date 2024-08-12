import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cookies } from "next/headers";
import axios from "axios";
type CardProps = React.ComponentProps<typeof Card>;

const Middle = async ({ className, ...props }: CardProps) => {
  const auth =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  const route = auth?.name !== "manager" ? "/" : `/${auth?.value}`;

  const { data } = await axios.get(
    `https://uramsys.onrender.com/tasks/${auth?.value}/${auth?.name}`
  );
  const len = await data.length;

  return (
    <section className="overflow-hidden flex flex-col h-4/5 w-full items-center">
      <div className={`${"h-full w-full"}`}>
        <Card
          className={cn("w-full bg-transparent h-full ", className)}
          {...props}
        >
          <h1 className="text-left pl-6 text-white text-xl mt-2 shadow-sm">
            Inbox
          </h1>
          <CardContent className="grid gap-4 overflow-scroll h-full w-full">
            <div className="flex flex-col gap-4  mt-4 pt-4 w-full p-4 rounded-xl">
              {data?.tasks?.map((task: any, index: number) => {
                return (
                  <Link
                    href={`/settings/alltasks/${task?._id}`}
                    key={task._id}
                    className={`${
                      index === len - 1 ? "mb-15px" : ""
                    } max-h-[30%] backdrop-blur-md bg-white/75 shadow-2xl rounded-md grid  items-center justify-items-stretch p-4 
                     w-[100%] overflow-hidden`}
                  >
                    {/* <Image
          loading="lazy"
          src={"/robot"}
          alt=""
          width={50}
          height={50}
        /> */}
                    <div className="space-y-1 overflow-hidden p-2 max-h-[90%]">
                      <p className="text-left text-lg font-medium leading-none text-black">
                        Title: {task.title}
                      </p>
                      <p
                        className={`text-left break-words text-sm text-muted-foreground overflow-hidden ${
                          task.status === "completed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <span className="text-black">Status:</span>{" "}
                        {task.status}
                      </p>
                      <p className="text-left break-words text-sm text-muted-foreground overflow-hidden text-green-800">
                        <span className="text-black">Deadline: </span>
                        {task.deadlineDate.split("T")[0]}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Middle;

// {data?.tasksT?.map((task: any, index: number) => {
//   return (
//     <Link
//       href={`/settings/alltasks/${task._id}`}
//       key={task._id}
//       className={`${
//         index === len - 1 ? "mb-15px" : ""
//       } max-h-[30%] backdrop-blur-md bg-white/80 shadow-2xl rounded-md grid  items-center justify-items-stretch p-4 last:mb-0 last:pb-0 w-[100%] overflow-hidden`}
//     >
//       {/* <Image
//           loading="lazy"
//           src={"/robot"}
//           alt=""
//           width={50}
//           height={50}
//         /> */}
//       <div className="space-y-1 overflow-hidden p-2 max-h-[90%]">
//         <p className="text-left text-lg font-medium leading-none">
//           Title: {task.title}
//         </p>
//         <p
//           className={`text-left break-words text-sm text-muted-foreground overflow-hidden ${
//             task.status === "completed"
//               ? "text-green-500"
//               : "text-red-500"
//           }`}
//         >
//           <span className="text-black">Status:</span>{" "}
//           {task.status}
//         </p>
//         <p className="text-left break-words text-sm text-muted-foreground overflow-hidden text-green-800">
//           <span className="text-black">Deadline: </span>
//           {task.deadlineDate.split("T")[0]}
//         </p>
//       </div>
//     </Link>
//   );
// })}
