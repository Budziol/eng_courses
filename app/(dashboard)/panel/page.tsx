import { getCurrentUser } from "@/app/(auth)/lib/auth";
import UserDashboard from "./components/UserDashboard";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logowanie");
  }

  return <UserDashboard user={user} />;
};
export default page;
