import Loader from "@/components/Loaders/Loader";
import SmallLoader from "@/components/Loaders/small-loader";
import { User } from "@/lib/generated/prisma/client";
import { SquarePen } from "lucide-react";
import PaymentBadge from "../../../../components/Payments/payment-badge";
import { UserWithPayments } from "../actions/getPaginatedUsers";
import { formatDate } from "@/lib/hooks/formatDate";
import Link from "next/link";

type Props = {
  isPending: boolean;
  data: UserWithPayments[];
  onUserSelect: (userid: string) => void;
  isUserPending: boolean;
  userToLoad: string | null;
};

const UsersTable = ({
  isPending,
  data,
  onUserSelect,
  isUserPending,
  userToLoad,
}: Props) => {
  return isPending ? (
    <Loader />
  ) : (
    <table className="w-full caption-bottom text-sm">
      <thead className="text-text-sub">
        <tr className="border-b border-border transition-colors data-[state=selected]:bg-muted hover:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium">Imie</th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Email
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Status
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium">
            Dołączył
          </th>
          <th className="h-12 px-4 text-right align-middle font-medium">
            Akcje
          </th>
        </tr>
      </thead>
      <tbody className="last:border-0">
        {data.map((u, i) => (
          <tr
            key={u.id}
            className="border-b last:border-none border-border transition-colors hover:bg-muted"
          >
            <td className="py-4 px-1 align-middle whitespace-nowrap">
              {u.name}
            </td>
            <td className="py-4 px-1 align-middle whitespace-nowrap">
              {u.email}
            </td>
            <td className="py-4 px-1 align-middle">
              <PaymentBadge paidTo={u.payments?.[0]?.paidTo} />
            </td>
            <td className="py-4 px-1 align-middle whitespace-nowrap">
              {formatDate(u.createdAt)}
            </td>
            <td className="py-4 px-1 align-middle">
              <div className="flex justify-end gap-2">
                <Link
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-main/10 hover:text-main h-10 w-10 cursor-pointer"
                  href={`/admin/uzytkownik/${u.id}`}
                >
                  {isUserPending && userToLoad === u.id ? (
                    <SmallLoader />
                  ) : (
                    <SquarePen size={18} />
                  )}
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default UsersTable;
