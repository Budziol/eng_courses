import { formatDateWithHour } from "@/lib/hooks/formatDate";
import { Meeting } from "@prisma/client";

type Props = {
  latestMeeting: Meeting | null;
};

export default function MeetingLatestInfo({ latestMeeting }: Props) {
  return (
    <div className="py-2">
      <p className="text-sm font-medium">Ostatnie spotkanie:</p>
      {latestMeeting ? (
        <p className="text-text-sub text-sm">
          {formatDateWithHour(latestMeeting.date)}
        </p>
      ) : (
        <p className="text-sm">Brak danych</p>
      )}
    </div>
  );
}
