import { User } from "@prisma/client";
import { getUserLevel } from "../actions/getUserLevel";
import UserLevel from "./user-level";

type Props = {
  user: User;
};

const UserLevelWrapper = async ({ user }: Props) => {
  const { level } = await getUserLevel(user.id);

  return (
    <div className="w-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-lg relative overflow-auto">
      <UserLevel user={user} level={level} />
    </div>
  );
};
export default UserLevelWrapper;
