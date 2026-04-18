import { getAllPaginatedMeetings } from "../actions/getAllPaginatedMeetings";
import { formatDate, formatDateWithHour } from "@/lib/hooks/formatDate";
import MeetingBadge from "@/components/Meetings/meeting-badge";
import EditButton from "./edit-button";

type Props = {
  page: number;
  search: string;
  limit: number;
  admin?: boolean;
};

const Table = async ({ page, search, limit, admin }: Props) => {
  const { data } = await getAllPaginatedMeetings(page, search, limit);

  return data.length <= 0 ? (
    <div>Brak spotkań</div>
  ) : (
    <table className="w-full caption-bottom text-sm">
      <thead className="text-text-sub">
        <tr className="border-b border-border transition-colors data-[state=selected]:bg-muted hover:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium">Data</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Email
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Status
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">Link</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Stworzono
          </th>
          {admin && (
            <th className="h-12 px-4 text-right align-middle font-medium">
              Akcje
            </th>
          )}
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
              {a.user.email}
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
            {admin && (
              <td className="py-4 px-4 align-middle">
                <div className="flex justify-end gap-2">
                  <EditButton id={a.id} />
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
