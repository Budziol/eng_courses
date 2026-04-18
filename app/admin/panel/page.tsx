import { getCurrentUser } from "@/app/(auth)/lib/auth";
import AdminDashboard from "./components/AdminDashboard";

const page = async () => {
  const user = await getCurrentUser();

  return <AdminDashboard user={user} />;
};
export default page;
