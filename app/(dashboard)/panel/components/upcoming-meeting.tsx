import { getUpcomingMeeting } from "../actions/getUpcomingMeetings";
import { formatDate, formatDateWithHour } from "@/lib/hooks/formatDate";
import { PrimaryLink } from "@/components/Links";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

const UpcomingMeeting = async ({ user }: Props) => {
  const upcoming = await getUpcomingMeeting(user.id);

  if (!upcoming) return <p className="mt-auto">Brak informacji</p>;

  return (
    <div className="flex flex-col gap-3 justify-between mt-auto">
      <div className="">
        <p className="">Data:</p>
        <p className="text-text-sub font-bold">{formatDate(upcoming.date)}</p>
      </div>
      <div className="">
        <p className="">Godzina:</p>
        <p className="text-text-sub font-bold">
          {formatDateWithHour(upcoming.date).split(" ")[1]}
        </p>
      </div>
      <PrimaryLink href={`https://${upcoming.link}`} linkClassName="mt-4">
        Dolącz
      </PrimaryLink>
    </div>
  );
};
export default UpcomingMeeting;
