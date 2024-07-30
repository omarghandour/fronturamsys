import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="mainBG overflow-hidden center flex-col w-full h-[100svh]">
      <Link href={"/dashboard/alltasks"}>
        <Button>{"<---"}</Button>
      </Link>
      <div className={`${"h-[50%] w-full"}`}>
        <Card className={cn("w-full backdrop-blur-md bg-white/80")}>
          <h1 className="text-left pl-6 text-black text-xl mt-2 shadow-sm">
            Tasks
          </h1>
          <CardContent className="grid gap-4 overflow-scroll h-full w-full">
            <div className="flex flex-col gap-4  mt-4 pt-4 w-full border border-black p-4 rounded-xl">
              <div className="space-y-1 overflow-hidden p-2 max-h-[90%]">
                <p className="text-left text-lg font-medium leading-none">
                  Title:
                </p>
                <p className="text-left break-words text-sm text-muted-foreground overflow-hidden ">
                  description
                </p>
                <p className="text-left text-sm text-muted-foreground overflow-hidden ">
                  Deadline:
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default page;
