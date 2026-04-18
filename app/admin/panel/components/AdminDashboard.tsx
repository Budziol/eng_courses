import DashboardHeader from "@/components/DashboardHeader";
import { User } from "@/lib/generated/prisma/client";
import AdminDashboardCard from "./AdminDashboardCard";
import UpcomingMeetings from "./UpcomingMeetings";

type AdminDashboardprops = {
  user: User | null;
};

const AdminDashboard = ({ user }: AdminDashboardprops) => {
  return (
    <>
      <DashboardHeader heading="Panel Admina" name={user!.name} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminDashboardCard />
        <AdminDashboardCard />
        <AdminDashboardCard />
        <AdminDashboardCard />
      </div>
      <UpcomingMeetings />
    </>
  );
};
export default AdminDashboard;
