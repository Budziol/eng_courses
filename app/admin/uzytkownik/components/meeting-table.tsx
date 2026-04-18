import { Meeting } from "@/lib/generated/prisma/client";
import { formatDate, formatDateWithHour } from "@/lib/hooks/formatDate";
import { SquarePen } from "lucide-react";
import MeetingBadge from "../../../../components/Meetings/meeting-badge";

type Props = {
  data: Meeting[];
  onMeetingSelect: (paymentId: string) => void;
};

const MeetingTable = ({ data, onMeetingSelect }: Props) => {
  return data.length < 1 ? (
    <p>Brak spotkań</p>
  ) : (
    <table className="w-full caption-bottom text-sm">
      <thead className="text-text-sub">
        <tr className="border-b border-border transition-colors data-[state=selected]:bg-muted hover:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Status
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">Link</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Stworzono
          </th>
          <th className="h-12 px-4 text-right align-middle font-medium">
            Akcje
          </th>
        </tr>
      </thead>
      <tbody className="last:border-0">
        {data.map((a, i) => (
          <tr
            key={a.id}
            className="border-b last:border-none border-border transition-colors hover:bg-muted"
          >
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {formatDateWithHour(a.date)}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              <MeetingBadge date={a.date} backendStatus={a.status} />
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {a.link}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {formatDate(a.createdAt)}
            </td>
            <td className="py-4 px-4 align-middle">
              <div className="flex justify-end gap-2">
                <button
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main h-10 w-10 cursor-pointer"
                  onClick={() => onMeetingSelect(a.id)}
                >
                  <SquarePen size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default MeetingTable;
