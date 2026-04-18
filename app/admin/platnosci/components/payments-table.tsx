import { formatDate, formatDateWithHour } from "@/lib/hooks/formatDate";
import { SquarePen } from "lucide-react";
import PaymentBadge from "@/components/Payments/payment-badge";
import { getAllPaginatedPayments } from "../actions/getAllPaginatedPayments";
import EditButton from "../../spotkania/components/edit-button";

type Props = {
  page: number;
  search: string;
  limit: number;
  admin?: boolean;
};

const PaymentsTable = async ({ page, search, limit, admin }: Props) => {
  const { data } = await getAllPaginatedPayments(page, search, limit);

  return data.length <= 0 ? (
    <div>Brak płatności</div>
  ) : (
    <table className="w-full caption-bottom text-sm">
      <thead className="text-text-sub">
        <tr className="border-b border-border transition-colors data-[state=selected]:bg-muted hover:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium">Od</th>
          <th className="h-12 px-4 text-left align-middle font-medium">Do</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Email
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Status
          </th>
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
              {formatDate(a.paidAt)}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {formatDate(a.paidTo)}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              {a.user.email}
            </td>
            <td className="py-4 px-4 align-middle whitespace-nowrap">
              <PaymentBadge paidTo={a.paidTo} />
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
export default PaymentsTable;
