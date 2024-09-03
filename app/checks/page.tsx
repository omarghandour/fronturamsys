import CheckInCheckOut from "@/components/CheckInCheckOut";
import CheckInCheckOutOnline from "@/components/CheckInCheckOutOnline";
import { cookies } from "next/headers";

const page = () => {
  const auth =
    cookies().get("manager") || cookies().get("admin") || cookies().get("user");
  const userId: any = auth?.value;
  return (
    <div>
      <CheckInCheckOut userId={userId} />
      <CheckInCheckOutOnline userId={userId} />
    </div>
  );
};

export default page;
