import DashboardHeader from "@/components/DashboardHeader";
import LevelWrapper from "@/app/(dashboard)/panel/components/level-wrapper";
import Loader from "@/components/Loaders/Loader";
import { CalendarDays } from "lucide-react";
import { Suspense } from "react";
import UpcomingMeeting from "./upcoming-meeting";
import Table from "@/app/admin/spotkania/components/meetings-table";
import { User } from "@prisma/client";

type UserDashboardProps = {
  user: User;
};

const UserDashboard = ({ user }: UserDashboardProps) => {
  return (
    <div className="flex flex-col max-w-[1440px] mx-auto px-4 py-6 h-full space-y-12">
      <DashboardHeader heading="Panel" name={user.name} />
      <div className="w-full flex flex-col gap-12 lg:flex-row justify-between">
        <div className="w-full flex flex-col bg-white border border-border rounded-lg p-8 shadow-xl space-y-6  min-h-[300px]">
          <div className="flex gap-3 justify-between">
            <h3 className="">Następne spotkanie</h3>
            <CalendarDays size={36} className="text-main" />
          </div>

          <Suspense fallback={<Loader />}>
            <UpcomingMeeting user={user} />
          </Suspense>
        </div>
        <div className="w-full flex flex-col space-y-6  min-h-[300px]">
          <Suspense fallback={<Loader />}>
            <LevelWrapper />
          </Suspense>
        </div>
      </div>
      <div className="w-full h-full flex flex-col bg-white border border-border rounded-lg p-8 shadow-xl">
        <h3 className="">Ostatnie spotkania</h3>
        <Suspense fallback={<Loader />}>
          <Table page={1} search={user.id} limit={5} />
        </Suspense>
      </div>
    </div>
  );
};
export default UserDashboard;
