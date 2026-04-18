import DashboardHeader from "@/components/DashboardHeader";
import { getUser } from "../actions/getUser";
import UserInfo from "../components/user-info";
import UserLevel from "../components/user-level";
import UserPayments from "../components/user-payments";
import { getLatestMeeting } from "../actions/getLatestMeeting";
import { getLatestPayment } from "../actions/getLatestPayment";
import UserMeetings from "../components/user-metings";
import UserTest from "../components/user-test";
import { Suspense } from "react";
import Loader from "@/components/Loaders/Loader";
import UserLevelWrapper from "../components/user-level-wrapper";

type Props = {
  params: Promise<{ id: string }>;
};

const UserPage = async ({ params }: Props) => {
  const { id } = await params;

  const user = await getUser(id);
  const latestMeeting = await getLatestMeeting(user.id);
  const latestPayment = await getLatestPayment(user.id);

  return (
    <div className="space-y-12">
      <DashboardHeader
        heading={`${user.name} ${user.lastName}`}
        text="Zarządzaj użytkownikiem"
      />
      <UserInfo user={user} />
      <div className="grid lg:grid-cols-2 gap-12">
        <Suspense fallback={<Loader />}>
          <UserLevelWrapper user={user} />
        </Suspense>
        <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
          <h4 className="">Test</h4>
          <Suspense fallback={<Loader />}>
            <UserTest user={user} />
          </Suspense>
        </div>
      </div>
      <UserPayments user={user} latestPayment={latestPayment} />
      <UserMeetings user={user} latestMeeting={latestMeeting} />
    </div>
  );
};
export default UserPage;
